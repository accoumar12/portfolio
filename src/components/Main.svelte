<script>
  // TODO: add a roastme section where people can roast at me.
  import Step from "./Step.svelte";

  let steps = [
    {
      href: "https://maccou-blog.netlify.app/building-a-3-d-similarity-model-for-cad-designs/",
      name: "3D Deep Learning",
      icon: "fa-solid fa-cube",
    },
    {
      href: "https://github.com/accoumar12/HPC-Cuda",
      name: "HPC Calculus",
      icon: "fa-solid fa-rocket",
    },
    {
      href: "https://github.com/accoumar12/DARTS",
      name: "DARTS",
      icon: "fa-solid fa-diagram-project",
    },
  ];

  let benefits = [
    {
      metric: "ML",
      name: "A machine learning engineer",
      description:
        "I love working with machine learning, especially computer vision and 3D data. I also enjoy backend development and know how to deploy models in production.",
    },
    {
      name: "Always learning",
      description:
        "I'm curious about new technologies and always looking to learn something new, whether it's ML-related or not.",
    },
    {
      // TODO: change this
      name: "Into endurance sports",
      description:
        "When I'm not coding, you'll find me trail running or cycling. I find that the discipline from sports helps me in my work too.",
    },
  ];
</script>

<main class="flex flex-col flex-1 p-4">
  <section
    id="introPage"
    class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14"
  >
    <div
      class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
    >
      <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Hi! I'm <span class="poppins text-violet-400">Martin ACCOU </span>
        <br />AI/ML
        <span class="poppins text-violet-400">Engineer</span>
      </h2>
      <p class="text-base sm:text-lg md:text-xl">
        I enjoy implementing <span class="text-violet-400">AI</span> and
        <span class="text-violet-400">backend</span>
        solutions, and I also handle some
        <span class="text-violet-400">frontend</span> work when needed.
      </p>
      <a
        href="#contact"
        class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950"
        role="button"
      >
        <div
          class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
        ></div>
        <span class="relative z-9">Get in touch 🤝</span>
      </a>
    </div>
    <div class="relative shadow-2xl grid place-items-center">
      <img
        src={"images/profile.png"}
        alt="Zetane Engine"
        class="object-cover z-[2] max-h-[70vh]"
      />
    </div>
  </section>
  <section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
    <div class="flex flex-col gap-2 text-center">
      <h6 class="text-large sm:text-xl md:text-2xl">
        Some projects from my work and personal time.
      </h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        Want to <span class="poppins text-violet-400">check them out</span>?
      </h3>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
      <Step step={steps[0]}>
        <p>
          I got into 2D computer vision during my studies, then moved into <strong
            class="text-violet-400">3D computer vision</strong
          >
          at D3S. There I built a
          <strong class="text-violet-400">3D similarity model</strong>
          and a
          <strong class="text-violet-400">3D instance segmentation model</strong
          > for working with CAD data.
        </p>
      </Step>
      <Step step={steps[1]}>
        <p>
          Building models is great, but <strong class="text-violet-400"
            >making them fast</strong
          >
          is even better, especially when they get big. I've worked with
          <strong class="text-violet-400">OpenMP</strong>,
          <strong class="text-violet-400">MPI</strong>, and
          <strong class="text-violet-400">CUDA</strong>. Check out my GitHub for
          examples, including some CUDA projects.
        </p>
      </Step>
      <Step step={steps[2]}>
        <p>
          I like reading research papers, and one caught my attention enough
          that I wrote a notebook about it. It's about <strong
            class="text-violet-400"
            >Differentiable Architecture Search
          </strong> - basically an automated way to optimize neural network architectures.
        </p>
      </Step>
    </div>
  </section>
  <section
    id="about"
    class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
  >
    <!-- <div class="z-[-1] bg-violet-950 w-screen left-1/2 -translate-x-1/2 top-0 h-full absolute"> </div> -->
    <div
      class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4"
    >
      <h6 class="text-large sm:text-xl md:text-2xl">Want to know more?</h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        A bit <span class="poppins text-violet-400">about</span> me.
      </h3>
    </div>
    <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">
      I am . . .
    </p>
    <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
      {#each benefits as benefit, index}
        <!-- <div class="flex flex-col gap-2 mx-auto">
                    <div class="flex items-end gap-4">
                        <p
                            class="poppins text-6xl sm:text-7xl md:text-8xl text-slate-500 font-medium"
                        >
                            {benefit.metric}
                        </p>
                        <p
                            class="text-xl sm:text-2xl md:text-3xl capitalize pb-2"
                        >
                            {benefit.name}
                        </p>
                    </div>
                    <p class="text-center italic">- {benefit.description}</p>
                </div> -->
        <div class="flex gap-6 sm:gap-8">
          <p
            class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold"
          >
            0{index + 1}
          </p>
          <div class="flex flex-col gap-6 sm:gap-8">
            <h3 class="text-2xl sm:text-3xl md:text-5xl">
              {benefit.name}
            </h3>
            <p>{benefit.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>
</main>
