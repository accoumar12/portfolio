<script>
    import Feedback from "../../components/Feedback.svelte";
    
    let y = 0;
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
    <title>Feedback - Martin ACCOU</title>
    <meta name="description" content="Share your anonymous feedback about Martin ACCOU's portfolio and work." />
</svelte:head>

<div class="min-h-screen flex flex-col relative bg-slate-950">
    <!-- Hero Section -->
    <section class="py-12 lg:py-20">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h1 class="font-semibold text-4xl sm:text-5xl md:text-6xl mb-6">
                    Share Your <span class="poppins text-violet-400">Feedback</span>
                </h1>
                <p class="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
                I'm a strong believer that receiving actionable feedback is one of the quickest ways to grow, and thank you for taking the time to help me improve!
                </p>
            </div>
        </div>
    </section>
    
    <!-- Feedback Form Section -->
    <section class="pb-12">
        <div class="container mx-auto px-6">
            <Feedback />
        </div>
    </section>
</div>
