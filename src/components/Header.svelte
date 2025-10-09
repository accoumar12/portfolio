<script>
  import AnimatedManLogo from "./AnimatedManLogo.svelte";
  export let y;
  export let tabs = [
    { name: "Projects ", link: "/#projects" },
    { name: "About me", link: "/#about" },
  ];

  let mobileMenuOpen = false;

  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMenu() {
    mobileMenuOpen = false;
  }
</script>

<header
  class={"sticky z-[10] top-0 duration-200 px-8 flex items-center justify-between border-b border-solid " +
    (y > 0
      ? " py-5 bg-slate-950 border-violet-950"
      : " py-8 bg-transparent border-transparent")}
>
  <a href="/" class="hover:text-violet-400 duration-200">
    <AnimatedManLogo />
  </a>

  <!-- Desktop Menu -->
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

  <!-- Mobile Menu Button -->
  <button
    on:click={toggleMenu}
    class="sm:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
    aria-label="Toggle menu"
  >
    <span
      class={"w-6 h-0.5 bg-white transition-all duration-300 " +
        (mobileMenuOpen ? "rotate-45 translate-y-2" : "")}
    />
    <span
      class={"w-6 h-0.5 bg-white transition-all duration-300 " +
        (mobileMenuOpen ? "opacity-0" : "")}
    />
    <span
      class={"w-6 h-0.5 bg-white transition-all duration-300 " +
        (mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")}
    />
  </button>
</header>

<!-- Mobile Menu Overlay -->
{#if mobileMenuOpen}
  <div
    class="fixed inset-0 bg-slate-950/95 z-[9] sm:hidden"
    on:click={closeMenu}
  >
    <nav class="flex flex-col items-center justify-center h-full gap-8 p-8">
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class="duration-200 hover:text-violet-400 text-2xl"
          target={index === 2 ? "_blank" : ""}
          on:click={closeMenu}
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <a
        href="https://maccou-blog.netlify.app/"
        class="blueShadow relative overflow-hidden px-8 py-4 group rounded-full bg-white text-slate-950"
        role="button"
        target="_blank"
        on:click={closeMenu}
      >
        <div
          class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
        />
        <h4 class="relative z-9 text-xl">My blog ✍️</h4>
      </a>
      <a
        href="#contact"
        class="blueShadow relative overflow-hidden px-8 py-4 group rounded-full bg-white text-slate-950"
        role="button"
        on:click={closeMenu}
      >
        <div
          class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
        />
        <h4 class="relative z-9 text-xl">Get in touch 🤝</h4>
      </a>
      <a
        href="/feedback"
        class="blueShadow relative overflow-hidden px-8 py-4 group rounded-full bg-violet-500 text-white"
        role="button"
        on:click={closeMenu}
      >
        <div
          class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
        />
        <h4 class="relative z-9 text-xl">Feedback 💭</h4>
      </a>
    </nav>
  </div>
{/if}
