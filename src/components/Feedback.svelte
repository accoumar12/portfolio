<script>
    let feedbackData = {
        message: '',
        name: '',
        email: ''
    };
    
    let isSubmitting = false;
    let showSuccess = false;
    let showError = false;
    let errorMessage = '';

    async function submitFeedback() {
        // Prevent double submissions
        if (isSubmitting) {
            return;
        }

        if (!feedbackData.message.trim()) {
            showError = true;
            errorMessage = 'Please provide your feedback message.';
            return;
        }

        isSubmitting = true;
        showError = false;
        showSuccess = false;

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...feedbackData,
                    // Add a unique client-side ID to prevent duplicates
                    clientId: generateClientId()
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit feedback');
            }
            
            showSuccess = true;
            
            // Reset form
            feedbackData = {
                message: '',
                name: '',
                email: ''
            };
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                showSuccess = false;
            }, 5000);
            
        } catch (error) {
            showError = true;
            if (error.message.includes('429') || error.message.includes('Duplicate')) {
                errorMessage = 'Please wait a moment before submitting again.';
            } else {
                errorMessage = error.message || 'Something went wrong. Please try again later.';
            }
        } finally {
            isSubmitting = false;
        }
    }

    function generateClientId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
</script>

<div class="max-w-2xl mx-auto w-full">
        <form on:submit|preventDefault={submitFeedback} class="space-y-4">
            <!-- Name -->
            <div>
                <label for="name" class="block text-sm font-medium text-slate-200 mb-1">
                    Your Name (Optional)
                </label>
                <input
                    id="name"
                    type="text"
                    bind:value={feedbackData.name}
                    placeholder="Enter your name"
                    class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white placeholder-slate-400"
                />
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-sm font-medium text-slate-200 mb-1">
                    Your Email (Optional)
                </label>
                <input
                    id="email"
                    type="email"
                    bind:value={feedbackData.email}
                    placeholder="Enter your email"
                    class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white placeholder-slate-400"
                />
            </div>

            <!-- Message -->
            <div>
                <label for="message" class="block text-sm font-medium text-slate-200 mb-1">
                    Your Feedback
                </label>
                <textarea
                    id="message"
                    bind:value={feedbackData.message}
                    placeholder="Enter you message here 🤠"
                    rows="6"
                    class="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white placeholder-slate-400 resize-none"
                ></textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex flex-col space-y-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    class="blueShadow relative overflow-hidden px-6 py-3 group rounded-full bg-violet-500 hover:bg-violet-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white transition-colors duration-200 disabled:opacity-60"
                >
                    <div class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"></div>
                    <span class="relative z-9 flex items-center justify-center">
                        {#if isSubmitting}
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        {:else}
                            Submit Feedback
                        {/if}
                    </span>
                </button>

                <!-- Success Message -->
                {#if showSuccess}
                    <div class="p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-200">
                        <div class="flex items-center">
                            <span class="text-green-400 mr-2">✓</span>
                            Thank you for your feedback! It has been submitted successfully.
                        </div>
                    </div>
                {/if}

                <!-- Error Message -->
                {#if showError}
                    <div class="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                        <div class="flex items-center">
                            <span class="text-red-400 mr-2">✗</span>
                            {errorMessage}
                        </div>
                    </div>
                {/if}
            </div>
        </form>
    </div>
