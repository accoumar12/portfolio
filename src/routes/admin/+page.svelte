<script>
    /** @type {import('./$types').PageData} */
    export let data;

    let isCleaningUp = false;
    let cleanupMessage = '';

    function formatDate(dateString) {
        return new Date(dateString).toLocaleString();
    }

    function formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
    }

    async function cleanupDuplicates() {
        if (isCleaningUp) return;
        
        isCleaningUp = true;
        cleanupMessage = '';
        
        try {
            const response = await fetch('/api/feedback/cleanup', {
                method: 'POST'
            });
            
            const result = await response.json();
            
            if (response.ok) {
                cleanupMessage = `✓ Cleanup completed! Removed ${result.removed_count} duplicates from ${result.original_count} total entries.`;
                // Reload the page to show updated data
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                cleanupMessage = `✗ Error: ${result.error}`;
            }
        } catch (error) {
            cleanupMessage = `✗ Failed to cleanup: ${error.message}`;
        } finally {
            isCleaningUp = false;
        }
    }
</script>

<svelte:head>
    <title>Admin - Feedback Dashboard</title>
</svelte:head>

<div class="min-h-screen bg-slate-900 text-white">
    <div class="container mx-auto px-6 py-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-violet-400 mb-2">Feedback Dashboard</h1>
            <p class="text-slate-300">Anonymous feedback submissions from your portfolio</p>
        </div>

        {#if data.feedbacks.length === 0}
            <div class="text-center py-12">
                <div class="text-6xl mb-4">📭</div>
                <h3 class="text-xl text-slate-300 mb-2">No feedback yet</h3>
                <p class="text-slate-400">Feedback submissions will appear here once people start using the feedback form.</p>
            </div>
        {:else}
            <div class="mb-4 flex justify-between items-center">
                <div class="text-sm text-slate-400">
                    Total feedback: {data.feedbacks.length}
                </div>
                <div class="flex items-center space-x-4">
                    {#if cleanupMessage}
                        <div class="text-sm {cleanupMessage.startsWith('✓') ? 'text-green-400' : 'text-red-400'}">
                            {cleanupMessage}
                        </div>
                    {/if}
                    <button
                        on:click={cleanupDuplicates}
                        disabled={isCleaningUp}
                        class="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200"
                    >
                        {isCleaningUp ? 'Cleaning...' : 'Remove Duplicates'}
                    </button>
                </div>
            </div>

            <div class="space-y-6">
                {#each data.feedbacks as feedback, index}
                    <div class="bg-slate-800 rounded-lg p-6 border border-slate-700">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center space-x-4">
                                <span class="text-sm bg-violet-900 text-violet-200 px-3 py-1 rounded-full">
                                    {formatCategory(feedback.category)}
                                </span>
                                {#if feedback.name}
                                    <span class="text-sm text-blue-400">
                                        👤 {feedback.name}
                                    </span>
                                {/if}
                                {#if feedback.email}
                                    <span class="text-sm text-green-400">
                                        ✉️ {feedback.email}
                                    </span>
                                {/if}
                            </div>
                            <div class="text-xs text-slate-400">
                                {formatDate(feedback.timestamp)}
                            </div>
                        </div>
                        
                        <div class="prose prose-slate prose-invert max-w-none">
                            <p class="text-slate-200 leading-relaxed whitespace-pre-wrap">{feedback.message}</p>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t border-slate-700">
                            <span class="text-xs text-slate-500">ID: {feedback.id}</span>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        <div class="mt-12 text-center space-x-4">
            <a 
                href="/" 
                class="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
                ← Back to Portfolio
            </a>
            <a 
                href="/feedback" 
                class="inline-block bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
                View Feedback Page
            </a>
        </div>
    </div>
</div>

<style>
    /* Custom scrollbar for better aesthetics */
    :global(html) {
        scrollbar-width: thin;
        scrollbar-color: #6366f1 #1e293b;
    }
    
    :global(::-webkit-scrollbar) {
        width: 8px;
    }
    
    :global(::-webkit-scrollbar-track) {
        background: #1e293b;
    }
    
    :global(::-webkit-scrollbar-thumb) {
        background: #6366f1;
        border-radius: 4px;
    }
</style>
