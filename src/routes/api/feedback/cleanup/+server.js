import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        const feedbackDir = 'feedback-data';
        const feedbackFile = path.join(feedbackDir, 'feedbacks.json');
        
        let feedbacks = [];
        try {
            const data = await fs.readFile(feedbackFile, 'utf-8');
            feedbacks = JSON.parse(data);
        } catch (error) {
            return json({ message: 'No feedback file found' }, { status: 404 });
        }
        
        if (!Array.isArray(feedbacks)) {
            return json({ error: 'Invalid feedback data format' }, { status: 400 });
        }
        
        // Remove duplicates based on ID and similar content
        const cleanedFeedbacks = [];
        const seenIds = new Set();
        const seenMessages = new Set();
        
        for (const feedback of feedbacks) {
            // Skip if we've seen this ID
            if (seenIds.has(feedback.id)) {
                continue;
            }
            
            // Skip if we've seen very similar message content
            const messageKey = feedback.message?.slice(0, 100).toLowerCase().trim();
            if (messageKey && seenMessages.has(messageKey)) {
                continue;
            }
            
            // Skip if feedback is invalid
            if (!feedback.message || !feedback.timestamp || !feedback.id) {
                continue;
            }
            
            seenIds.add(feedback.id);
            if (messageKey) {
                seenMessages.add(messageKey);
            }
            cleanedFeedbacks.push(feedback);
        }
        
        // Sort by timestamp (newest first)
        cleanedFeedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Write cleaned data back
        await fs.writeFile(feedbackFile, JSON.stringify(cleanedFeedbacks, null, 2));
        
        return json({
            message: 'Feedback data cleaned successfully',
            original_count: feedbacks.length,
            cleaned_count: cleanedFeedbacks.length,
            removed_count: feedbacks.length - cleanedFeedbacks.length
        });
        
    } catch (error) {
        console.error('Error cleaning feedback data:', error);
        return json(
            { error: 'Failed to clean feedback data' },
            { status: 500 }
        );
    }
}
