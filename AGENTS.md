# AGENTS.md

Guidelines for AI agents working on this project.

## Project overview

Static personal blog and project showcase at **123474.xyz**. Astro 5.x, Tailwind CSS 4.x, Svelte 5.x islands, deployed to Cloudflare Pages.

All content is markdown files in `src/content/blog/`. No database, no CMS, no auth, no server-side rendering.

## Tech stack

- **Framework**: Astro 5.x (static output only)
- **Styling**: Tailwind CSS 4.x with `@tailwindcss/vite` plugin (NOT the old `@astrojs/tailwind` integration)
- **Components**: Astro components for layout, Svelte 5 for interactive islands
- **Content**: Astro content collections with glob loader (`src/content.config.ts`)
- **Syntax highlighting**: `astro-expressive-code` (must be listed before `mdx()` in integrations)
- **Search**: Pagefind (indexes built HTML, import externalized in rollup config)
- **Linting**: Biome (not ESLint/Prettier)
- **Package manager**: pnpm (not npm/yarn)

## Architecture decisions

- **Dark mode**: CSS custom properties in `global.css` (`:root` for light, `.dark` for dark). Tailwind dark variant configured as `@custom-variant dark (&:where(.dark, .dark *))`. Inline script in `Base.astro` `<head>` prevents flash.
- **Fonts**: Geist Sans + Geist Mono via `@fontsource-variable`. Imported in `global.css`.
- **Color palette**: Monochrome only. `--color-blackout: #080808`, `--color-whiteout: #f7f7f7`, grey scale. Semantic tokens: `--bg`, `--fg`, `--muted`, `--border`, `--surface`.
- **Svelte islands**: Use `client:load` for ThemeToggle and Search, `client:visible` for ReadingProgress. Keep islands minimal — most UI is Astro components.
- **Pagefind**: The `/pagefind/pagefind.js` import is externalized in `astro.config.mjs` rollup options. Pagefind only works after `pnpm build` (not in dev).
- **Content collection**: Uses the Astro 5.x glob loader pattern in `src/content.config.ts` (not the legacy `src/content/config.ts` path). Post IDs are the filename stem (e.g., `hello-world`).

## Code style

- **Formatting**: 2-space indent, double quotes for JS/TS, handled by Biome
- **Components**: Astro components in `src/components/`, Svelte islands in `src/components/svelte/`
- **CSS**: Use Tailwind utility classes. For custom properties, use `text-(--muted)` syntax (Tailwind v4 arbitrary property shorthand). Avoid raw CSS unless defining theme variables in `global.css`.
- **No accent colors**: Design is strictly black/white/grey. Do not introduce colored accents.

## Key files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (site URL, integrations, vite/rollup) |
| `src/content.config.ts` | Content collection schema definition |
| `src/styles/global.css` | Tailwind directives, fonts, CSS custom properties |
| `src/layouts/Base.astro` | HTML shell, SEO meta, dark mode script |
| `src/layouts/Post.astro` | Blog post layout (wraps Base) |
| `src/data/projects.ts` | Project showcase data |
| `biome.json` | Linter/formatter config |
| `wrangler.toml` | Cloudflare Pages deployment config |

## Commands

```bash
pnpm dev        # Start dev server at localhost:4321
pnpm build      # Production build + pagefind indexing
pnpm preview    # Preview built site locally
pnpm biome check .        # Lint check
pnpm biome check --write .  # Auto-fix lint issues
```

## Common tasks

### Adding a blog post

Create `src/content/blog/my-post.md` with frontmatter: `title`, `description`, `date`, `tags`, `draft`. The filename becomes the URL slug.

### Adding a project

Add an entry to the `projects` array in `src/data/projects.ts`.

### Modifying the theme

Edit CSS custom properties in `src/styles/global.css` under `:root` (light) and `.dark` (dark).

### Adding a new Svelte island

1. Create `.svelte` file in `src/components/svelte/`
2. Import in the Astro component that uses it
3. Add `client:load` or `client:visible` directive

## Gotchas

- `astro-expressive-code` must come **before** `mdx()` in the integrations array
- Pagefind search only works in the production build, not dev mode
- The pagefind JS import uses a dynamic `import()` that must be externalized in rollup — do not remove the `build.rollupOptions.external` config
- Tailwind v4 uses `@theme` and `@custom-variant` directives, not the old `tailwind.config.ts` file
- Content collection uses `src/content.config.ts` (Astro 5.x pattern), not `src/content/config.ts`
