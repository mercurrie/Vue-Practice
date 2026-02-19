# Vue Practice

A monorepo of independent Vue 3 practice projects, each exploring different concepts and libraries.

## Projects

| Directory | Description | Key Tech |
|-----------|-------------|----------|
| [task-app/](task-app/) | Task manager with filtering and animated transitions | Vue 3, TypeScript, PicoCSS |
| [To-Do-App/](To-Do-App/) | To-do list with persistent storage and inline editing | Vue 3, TypeScript, Vuetify, Pinia |
| [Events-App/](Events-App/) | Events listing app | Vue 3, Vue Router, Pinia, Axios |
| [Quiz/](Quiz/) | Quiz app | Vue 3 |
| [Slots/](Slots/) | Vue slots practice | Vue 3 |

## Structure

Each project is self-contained with its own `package.json` and `node_modules`. Navigate into a project directory before running any commands.

```bash
cd task-app   # or any other project directory
npm install
npm run dev
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
