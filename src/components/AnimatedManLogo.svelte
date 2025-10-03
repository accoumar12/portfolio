<script>
  import { onMount, onDestroy } from "svelte";

  let containerRef;
  let rotation = { x: 0, y: 0 };
  let eyePosition = {
    left: { x: 168.5, y: 168.42 },
    right: { x: 231.5, y: 168.42 },
  };
  let blink = false;
  let headNod = 0;

  let blinkInterval;
  let nodInterval;

  const handleMouseMove = (event) => {
    if (!containerRef) return;

    const bounds = containerRef.getBoundingClientRect();
    const containerCenterX = bounds.left + bounds.width / 2;
    const containerCenterY = bounds.top + bounds.height / 2;

    if (
      event.clientX <= 0 ||
      event.clientY <= 0 ||
      event.clientX >=
        (typeof window !== "undefined" ? window.innerWidth : 0) ||
      event.clientY >= (typeof window !== "undefined" ? window.innerHeight : 0)
    ) {
      rotation = { x: 0, y: 0 };
      eyePosition = {
        left: { x: 168.5, y: 168.42 },
        right: { x: 231.5, y: 168.42 },
      };
      return;
    }

    const clientX =
      event.clientX || (event.touches && event.touches[0].clientX);
    const clientY =
      event.clientY || (event.touches && event.touches[0].clientY);

    const deltaX = clientX - containerCenterX;
    const deltaY = clientY - containerCenterY;

    const rotationX = (deltaY / bounds.height) * 5;
    const rotationY = (deltaX / bounds.width) * 5;

    rotation = {
      x: Math.max(-25, Math.min(25, rotationX)),
      y: Math.max(-25, Math.min(25, rotationY)),
    };

    const eyeMovementScale = 0.5;
    const eyeX = (deltaX / bounds.width) * eyeMovementScale;
    const eyeY = (deltaY / bounds.height) * eyeMovementScale;

    eyePosition = {
      left: {
        x: 168.5 + eyeX,
        y: 168.42 + eyeY,
      },
      right: {
        x: 231.5 + eyeX,
        y: 168.42 + eyeY,
      },
    };
  };

  const resetPosition = () => {
    rotation = { x: 0, y: 0 };
    eyePosition = {
      left: { x: 168.5, y: 168.42 },
      right: { x: 231.5, y: 168.42 },
    };
  };

  onMount(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove, { passive: true });
      window.addEventListener("touchstart", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", resetPosition);
    }

    blinkInterval = setInterval(
      () => {
        blink = true;
        setTimeout(() => (blink = false), 300);
      },
      Math.random() * 5000 + 3000
    );

    nodInterval = setInterval(
      () => {
        const randomNod =
          Math.random() > 0.5 ? Math.random() * 3 : -Math.random() * 3;
        headNod = randomNod;
        setTimeout(() => (headNod = 0), 500);
      },
      Math.random() * 5000 + 3000
    );
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
      window.removeEventListener("mouseleave", resetPosition);
    }
    clearInterval(blinkInterval);
    clearInterval(nodInterval);
  });
</script>

<div
  bind:this={containerRef}
  class="flex justify-center items-center w-20 h-20 cursor-pointer hover:scale-110 duration-200"
  style="overflow: visible;"
>
  <svg
    viewBox="0 0 300 300"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    width="100%"
    height="100%"
    style="transform: perspective(1000px) rotateX({rotation.x}deg) rotateY({rotation.y}deg) rotateX({headNod}deg); transition: transform 0.1s ease-out;"
  >
    <g transform="matrix(1.21255 0 0 1.436339-93.789046-95.537147)">
      <g transform="translate(1.05484 0)">
        <circle r="19.5" transform="translate(262.25 180.57)" fill="#ffc57d" />
        <circle r="19.5" transform="translate(137.75 180.57)" fill="#ffc57d" />
        <path
          d="M189,85.49h22c28.990374.016559,52.484485,23.519621,52.49,52.51v56.07c0,30.773306-24.946694,55.72-55.72,55.72h-15.55c-30.773306,0-55.72-24.946694-55.72-55.72v-56.07c.005519-28.994281,23.50572-52.498959,52.5-52.51Z"
          transform="translate(-1.24 0)"
          fill="#ffc57d"
        />
        <path
          d="M189.44,207.14c2.187309,3.714044,6.146374,6.025788,10.455912,6.10533s8.351214-2.084532,10.674088-5.71533"
          fill="none"
          stroke="#eb952a"
          stroke-width="4"
          stroke-linecap="round"
          stroke-miterlimit="10"
        />
        <path
          d="M206.78,187.11c-1.419143-2.363024-3.954822-3.829029-6.710774-3.879839s-5.343945,1.320732-6.849226,3.629839"
          fill="none"
          stroke="#eb952a"
          stroke-width="4"
          stroke-linecap="round"
          stroke-miterlimit="10"
        />
        <g>
          <ellipse
            rx="6.88"
            ry={blink ? "3.5" : "7.43"}
            transform="translate({eyePosition.left.x} {eyePosition.left.y})"
            style="transition: transform 0.1s ease-out, ry 0.3s ease-in-out;"
          />
          <ellipse
            rx="6.88"
            ry={blink ? "3.5" : "7.43"}
            transform="translate({eyePosition.right.x} {eyePosition.right.y})"
            style="transition: transform 0.1s ease-out, ry 0.3s ease-in-out;"
          />
        </g>
        <g transform="translate(-.419997 0)">
          <line
            x1="219.84"
            y1="143.66"
            x2="243.17"
            y2="143.66"
            fill="none"
            stroke="#ce8b28"
            stroke-width="12"
            stroke-linecap="round"
            stroke-miterlimit="10"
          />
          <line
            x1="156.83"
            y1="143.66"
            x2="180.16"
            y2="143.66"
            fill="none"
            stroke="#ce8b28"
            stroke-width="12"
            stroke-linecap="round"
            stroke-miterlimit="10"
          />
        </g>
      </g>
    </g>
  </svg>
</div>
