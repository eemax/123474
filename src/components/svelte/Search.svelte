<script>
  let open = $state(false);
  let query = $state("");
  let results = $state([]);
  let pagefind = $state(null);
  let inputEl;

  async function loadPagefind() {
    if (pagefind) return;
    try {
      pagefind = await import(/* @vite-ignore */ "/pagefind/pagefind.js");
      await pagefind.init();
    } catch {
      // Pagefind not available in dev mode
    }
  }

  async function search() {
    if (!pagefind || !query.trim()) {
      results = [];
      return;
    }
    const searchResults = await pagefind.search(query);
    const data = await Promise.all(searchResults.results.slice(0, 8).map((r) => r.data()));
    results = data;
  }

  function openSearch() {
    open = true;
    loadPagefind();
    // Focus input after DOM update
    setTimeout(() => inputEl?.focus(), 10);
  }

  function closeSearch() {
    open = false;
    query = "";
    results = [];
  }

  function handleKeydown(e) {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open ? closeSearch() : openSearch();
    }
    if (e.key === "Escape" && open) {
      closeSearch();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<button
  onclick={openSearch}
  aria-label="Search"
  class="rounded-md p-1.5 text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
</button>

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh] backdrop-blur-sm"
    onclick={closeSearch}
    onkeydown={(e) => e.key === "Escape" && closeSearch()}
  >
    <!-- Modal -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="mx-4 w-full max-w-lg rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 shadow-2xl"
      onclick={(e) => e.stopPropagation()}
      onkeydown={(e) => e.stopPropagation()}
    >
      <input
        bind:this={inputEl}
        bind:value={query}
        oninput={search}
        type="text"
        placeholder="Search posts..."
        class="w-full rounded-md border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--fg)]"
      />

      {#if results.length > 0}
        <ul class="mt-3 max-h-80 space-y-1 overflow-y-auto">
          {#each results as result}
            <li>
              <a
                href={result.url}
                onclick={closeSearch}
                class="block rounded-md px-3 py-2 text-sm no-underline transition-colors hover:bg-[var(--surface)]"
              >
                <span class="font-medium">{result.meta?.title || result.url}</span>
                {#if result.excerpt}
                  <span class="mt-1 block text-xs text-[var(--muted)]">{@html result.excerpt}</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {:else if query.trim()}
        <p class="mt-3 text-center text-sm text-[var(--muted)]">No results found.</p>
      {/if}
    </div>
  </div>
{/if}
