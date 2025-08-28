import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
    return json({ 
        message: 'Cleanup is no longer needed. Feedback system now sends emails directly instead of storing files.',
        removed_count: 0,
        original_count: 0
    }, { status: 200 });
}
