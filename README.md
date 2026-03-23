# 123474.xyz

Personal blog and project showcase. Built with Astro, Tailwind CSS, and Svelte.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22.12.0
- [pnpm](https://pnpm.io/) (install with `npm install -g pnpm`)

## Getting started

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:4321)
pnpm dev

# Production build (outputs to dist/)
pnpm build

# Preview production build locally
pnpm preview
```

## Project structure

```
src/
├── components/
│   ├── svelte/           # Interactive islands (ThemeToggle, Search, ReadingProgress)
│   ├── BlogCard.astro
│   ├── ProjectCard.astro
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Prose.astro       # Typography wrapper for markdown content
│   └── TableOfContents.astro
├── content/
│   └── blog/             # Blog posts as .md files
├── data/
│   └── projects.ts       # Project showcase entries
├── layouts/
│   ├── Base.astro        # HTML shell, SEO meta, dark mode
│   └── Post.astro        # Blog post layout
├── pages/
│   ├── index.astro       # Homepage (hero, recent posts, projects)
│   ├── blog/
│   │   ├── index.astro   # All posts
│   │   └── [...slug].astro
│   ├── tags/
│   │   └── [tag].astro   # Posts filtered by tag
│   └── rss.xml.ts        # RSS feed
└── styles/
    └── global.css        # Tailwind + CSS variables + typography
```

## Writing blog posts

Create a `.md` file in `src/content/blog/`:

```md
---
title: "Post Title"
description: "One sentence summary."
date: 2026-03-22
tags: ["astro", "ai"]
draft: false
---

Your content here.
```

**Frontmatter fields:**

| Field       | Required | Description                          |
|-------------|----------|--------------------------------------|
| title       | yes      | Post title                           |
| description | yes      | Short summary (used in SEO + cards)  |
| date        | yes      | Publication date                     |
| tags        | no       | Array of tag strings (default: `[]`) |
| draft       | no       | Set `true` to hide from build        |
| updated     | no       | Last updated date                    |
| cover       | no       | Path to cover image in `/public`     |
| coverAlt    | no       | Alt text for cover image             |

## Adding projects

Edit `src/data/projects.ts`:

```ts
export const projects: Project[] = [
  {
    name: "My Project",
    description: "What it does.",
    url: "https://github.com/you/project",
    tags: ["typescript", "ai"],
  },
];
```

## Stack

| Layer              | Tool                | Notes                              |
|--------------------|---------------------|------------------------------------|
| Framework          | Astro 5.x           | Static site generation             |
| Styling            | Tailwind CSS 4.x    | Utility-first, dark mode via class |
| Interactivity      | Svelte 5.x          | Islands for theme, search, etc.    |
| Syntax highlighting| Expressive Code      | GitHub dark/light themes           |
| Search             | Pagefind             | Client-side, built at build time   |
| Linting/Formatting | Biome                | `pnpm biome check .`              |
| Deployment         | Cloudflare Pages     | Static file serving                |

## Deployment

The site deploys to Cloudflare Pages. Connect the GitHub repo in the Cloudflare dashboard — every push to `main` triggers a build. Config is in `wrangler.toml`.

## Linting

```bash
# Check for issues
pnpm biome check .

# Auto-fix
pnpm biome check --write .
```
