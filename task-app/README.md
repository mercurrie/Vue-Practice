# Task App

A simple task manager built with Vue 3, TypeScript, and Vite.

## Features

- Add and remove tasks
- Mark tasks as done/undone
- Filter tasks by status: All, Done, or Todo
- Animated task list transitions
- Dark mode UI via PicoCSS

## Tech Stack

- **Vue 3** — Composition API with `<script setup>`
- **TypeScript** — fully typed components and state
- **Vite** — dev server and build tool
- **PicoCSS** — classless CSS framework for base styles
- **Vitest** — unit testing

## Project Structure

```
src/
├── App.vue               # Root component — owns all state
├── types.ts              # Task interface and TaskFilter type
└── components/
    ├── TaskForm.vue       # Input form, emits addTask
    ├── FilterSelect.vue   # Filter dropdown, emits updateFilter
    └── TaskList.vue       # Task list with toggle/remove, animated with TransitionGroup
```

## Getting Started

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run test` | Run unit tests with Vitest |
