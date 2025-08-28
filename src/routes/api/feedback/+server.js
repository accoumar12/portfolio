import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

// In-memory store to prevent duplicate submissions
const recentSubmissions = new Map();
const DUPLICATE_WINDOW = 5000; // 5 seconds

// Email configuration - you'll need to set these environment variables
const EMAIL_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS  // your app password
    }
};

const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || process.env.SMTP_USER;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const feedback = await request.json();
        
        // Validate the feedback data
        if (!feedback.message || feedback.message.trim().length === 0) {
            return json(
                { error: 'Feedback message is required' }, 
                { status: 400 }
            );
        }

        // Check for duplicate submissions based on message content and client ID
        const submissionKey = `${feedback.clientId || 'unknown'}_${feedback.message.slice(0, 50)}`;
        const now = Date.now();
        
        if (recentSubmissions.has(submissionKey)) {
            const lastSubmission = recentSubmissions.get(submissionKey);
            if (now - lastSubmission < DUPLICATE_WINDOW) {
                return json(
                    { error: 'Duplicate submission detected. Please wait before submitting again.' }, 
                    { status: 429 }
                );
            }
        }
        
        // Record this submission
        recentSubmissions.set(submissionKey, now);
        
        // Clean up old entries
        for (const [key, timestamp] of recentSubmissions.entries()) {
            if (now - timestamp > DUPLICATE_WINDOW) {
                recentSubmissions.delete(key);
            }
        }

        // Add timestamp and server-generated ID
        const feedbackWithTimestamp = {
            category: feedback.category,
            message: feedback.message.trim(),
            name: feedback.name ? feedback.name.trim() : '',
            email: feedback.email ? feedback.email.trim() : '',
            timestamp: new Date().toISOString(),
            id: generateId(),
            clientId: feedback.clientId
        };

        // Log the feedback
        console.log('Feedback received:', feedbackWithTimestamp);
        
        // Send email instead of saving to file
        await sendFeedbackEmail(feedbackWithTimestamp);

        return json(
            { message: 'Feedback submitted successfully', id: feedbackWithTimestamp.id }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Error processing feedback:', error);
        return json(
            { error: 'Internal server error' }, 
            { status: 500 }
        );
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function sendFeedbackEmail(feedback) {
    try {
        // Check if email configuration is available
        if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
            console.warn('Email configuration not found. Logging feedback to console instead.');
            console.log('=== FEEDBACK SUBMISSION ===');
            console.log('Name:', feedback.name || 'Not provided');
            console.log('Email:', feedback.email || 'Not provided');
            console.log('Message:', feedback.message);
            console.log('Timestamp:', feedback.timestamp);
            console.log('ID:', feedback.id);
            console.log('=========================');
            return; // Exit without sending email
        }

        // Create transporter
        const transporter = nodemailer.createTransport(EMAIL_CONFIG);

        // Prepare email content
        const emailSubject = `Portfolio Feedback - ${feedback.id}`;
        
        const emailHtml = `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 500px; margin: 0 auto; color: #333;">
                <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 24px 0;">New Feedback</h2>
                
                <div style="margin-bottom: 20px;">
                    <p style="margin: 4px 0;"><strong>Name:</strong> ${feedback.name || 'Anonymous'}</p>
                    <p style="margin: 4px 0;"><strong>Email:</strong> ${feedback.email || 'Not provided'}</p>
                    <p style="margin: 4px 0;"><strong>Date:</strong> ${new Date(feedback.timestamp).toLocaleDateString()}</p>
                </div>

                <div style="margin: 20px 0;">
                    <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
                    <p style="margin: 0; line-height: 1.5; white-space: pre-wrap;">${feedback.message}</p>
                </div>
            </div>
        `;

        const emailText = `
New Feedback

Name: ${feedback.name || 'Anonymous'}
Email: ${feedback.email || 'Not provided'}
Date: ${new Date(feedback.timestamp).toLocaleDateString()}

Message:
${feedback.message}
        `;

        // Send email
        const mailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to: RECIPIENT_EMAIL,
            subject: emailSubject,
            text: emailText,
            html: emailHtml
        };

        await transporter.sendMail(mailOptions);
        console.log('Feedback email sent successfully:', feedback.id);

    } catch (error) {
        console.error('Error sending feedback email:', error);
        throw new Error('Failed to send feedback email');
    }
}