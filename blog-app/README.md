# Mason's Blog App

A personal blog app built with Vue 3, Vuetify, and Vite as part of a Vue practice monorepo.

## Stack

- [Vue 3](https://v3.vuejs.org/) — Composition API with `<script setup>`
- [Vuetify 3](https://vuetifyjs.com/) — Material Design component library
- [Vue Router](https://router.vuejs.org/) — File-based routing via `unplugin-vue-router`
- [Pinia](https://pinia.vuejs.org/) — State management
- [TypeScript](https://www.typescriptlang.org/) — Type safety throughout
- [Vite](https://vitejs.dev/) — Dev server and build tool

## Project Structure

```
src/
├── components/
│   ├── AppHeader.vue   # Navigation bar
│   ├── AppFooter.vue   # Footer
│   └── Blog.vue        # Blog post card grid
├── data/
│   └── blogs.json      # Static blog post data
├── layouts/
│   └── default.vue     # App shell (header + router-view + footer)
├── pages/
│   ├── index.vue       # Home — renders Blog component
│   └── about.vue       # About page
└── types.ts            # Blog interface
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — displays all blog post cards |
| `/about` | About page with blog info |

## Getting Started

Install dependencies from the `blog-app/` directory:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
