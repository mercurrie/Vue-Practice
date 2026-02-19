# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo of independent Vue 3 practice projects. Each subdirectory is its own self-contained app with its own `package.json` and `node_modules`. Always `cd` into the relevant project before running commands.

| Directory | Description |
|-----------|-------------|
| `task-app/` | TypeScript task manager — the primary active project |
| `Events-App/` | Events listing app with Vue Router and Pinia |
| `Slots/` | Vue slots practice |

## task-app Commands

All commands must be run from `task-app/`:

```bash
npm run dev      # start dev server (Vite)
npm run build    # type-check with vue-tsc, then build
npm run preview  # preview the production build
```

No test runner is configured.

## task-app Architecture

**Stack:** Vue 3 + TypeScript + Vite + PicoCSS (classless CSS framework via `@picocss/pico`). No router, no state management library — all state lives in `App.vue`.

**SFC convention:** Every component uses two script blocks:
- `<script setup lang="ts">` — Composition API logic
- `<script lang="ts">` with `export default { name: '...' }` — component name

**Data flow (all in `src/`):**

```
App.vue  (owns tasks[], filter)
├── TaskForm.vue   — emits addTask
├── FilterSelect.vue — receives filter prop, emits updateFilter
└── TaskList.vue   — receives filteredTasks[], emits toggleTask, removeTask
```

- `tasks` is filtered in `App.vue` via a `filteredTasks` computed before being passed to `TaskList`
- `TaskFilter` type (`"all" | "done" | "todo"`) and `Task` interface are defined in `src/types.ts`
- `<TransitionGroup name="list">` in `TaskList.vue` animates task add/remove

**Styling:** PicoCSS provides base styles via the `class="dark"` attribute on `<main>`. Component-level overrides use `<style scoped>`.
