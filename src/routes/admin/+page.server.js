import { json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    // Feedback is now sent via email, no longer stored on disk
    return {
        feedbacks: [],
        emailMode: true,
        message: 'Feedback system has been updated to send emails directly instead of storing data locally.'
    };
}
