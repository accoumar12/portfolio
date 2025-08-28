import { json } from '@sveltejs/kit';

// In-memory store to prevent duplicate submissions
const recentSubmissions = new Map();
const DUPLICATE_WINDOW = 5000; // 5 seconds

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
        
        // Save to file
        await saveFeedback(feedbackWithTimestamp);

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

// Simple file locking mechanism to prevent race conditions
let isWriting = false;
const writeQueue = [];

async function saveFeedback(feedback) {
    return new Promise((resolve, reject) => {
        writeQueue.push({ feedback, resolve, reject });
        processWriteQueue();
    });
}

async function processWriteQueue() {
    if (isWriting || writeQueue.length === 0) {
        return;
    }
    
    isWriting = true;
    
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        const feedbackDir = 'feedback-data';
        const feedbackFile = path.join(feedbackDir, 'feedbacks.json');
        
        // Create directory if it doesn't exist
        try {
            await fs.mkdir(feedbackDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }
        
        // Process all queued writes at once
        let existingFeedbacks = [];
        try {
            const data = await fs.readFile(feedbackFile, 'utf-8');
            existingFeedbacks = JSON.parse(data);
        } catch (error) {
            // File doesn't exist yet, start with empty array
        }
        
        // Ensure it's an array
        if (!Array.isArray(existingFeedbacks)) {
            existingFeedbacks = [];
        }
        
        // Add all queued feedbacks
        const currentQueue = [...writeQueue];
        writeQueue.length = 0; // Clear the queue
        
        for (const { feedback, resolve, reject } of currentQueue) {
            try {
                // Check if this feedback already exists (by ID or content similarity)
                const isDuplicate = existingFeedbacks.some(existing => 
                    existing.id === feedback.id || 
                    (existing.message === feedback.message && 
                     Math.abs(new Date(existing.timestamp) - new Date(feedback.timestamp)) < 10000) // 10 seconds
                );
                
                if (!isDuplicate) {
                    existingFeedbacks.push(feedback);
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        }
        
        // Write the updated file
        await fs.writeFile(feedbackFile, JSON.stringify(existingFeedbacks, null, 2));
        
    } catch (error) {
        console.error('Error saving feedback to file:', error);
        // Reject all queued operations
        const currentQueue = [...writeQueue];
        writeQueue.length = 0;
        for (const { reject } of currentQueue) {
            reject(error);
        }
    } finally {
        isWriting = false;
        // Process any new items that were added while we were writing
        if (writeQueue.length > 0) {
            setTimeout(processWriteQueue, 100);
        }
    }
}
