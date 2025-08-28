import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const fs = await import('fs/promises');
        const path = await import('path');
        
        const feedbackFile = path.join('feedback-data', 'feedbacks.json');
        
        try {
            const data = await fs.readFile(feedbackFile, 'utf-8');
            const feedbacks = JSON.parse(data);
            
            // Sort by timestamp (newest first)
            feedbacks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            return {
                feedbacks
            };
        } catch (error) {
            // File doesn't exist yet
            return {
                feedbacks: []
            };
        }
    } catch (error) {
        console.error('Error loading feedbacks:', error);
        return {
            feedbacks: []
        };
    }
}
