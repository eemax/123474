<script>
  let progress = $state(0);

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  }
</script>

<svelte:window onscroll={handleScroll} />

<div
  class="fixed top-0 left-0 z-50 h-0.5 bg-[var(--fg)] transition-[width] duration-150"
  style="width: {progress}%"
  aria-hidden="true"
/>
