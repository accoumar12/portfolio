<script>
  export let y;

  export let tabs = [
    { name: "Projects ", link: "/#projects" },
    { name: "About me", link: "/#about" },
  ];
</script>

<header
  class={"sticky z-[10] top-0 duration-200 px-8 flex items-center justify-between border-b border-solid " +
    (y > 0
      ? " py-5 bg-slate-950 border-violet-950"
      : " py-8 bg-transparent border-transparent")}
>
  <a href="/" class="font-medium hover:text-violet-400 duration-200">
    <h1>
      <b class="font-bold poppins">Martin</b> <span class="">ACCOU</span>
    </h1>
  </a>
  <div class="sm:flex items-center gap-6 hidden">
    {#each tabs as tab, index}
      <a
        href={tab.link}
        class="duration-200 hover:text-violet-400 text-lg"
        target={index === 2 ? "_blank" : ""}
      >
        <p>{tab.name}</p>
      </a>
    {/each}
    <a
      href="https://maccou-blog.netlify.app/"
      class="blueShadow relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950"
      role="button"
      target="_blank"
    >
      <div
        class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
      />
      <h4 class="relative z-9 text-lg">My blog ✍️</h4>
    </a>
    <a
      href="#contact"
      class="blueShadow relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950"
      role="button"
    >
      <div
        class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
      />
      <h4 class="relative z-9 text-lg">Get in touch 🤝</h4>
    </a>
    <a
      href="/feedback"
      class="blueShadow relative overflow-hidden px-6 py-3 group rounded-full bg-violet-500 text-white"
      role="button"
    >
      <div
        class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
      />
      <h4 class="relative z-9 text-lg">Feedback 💭</h4>
    </a>
  </div>
</header>
