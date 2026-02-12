# To-Do App

A modern, fully-tested to-do list application built with Vue 3, TypeScript, and Vuetify. Features persistent storage, inline editing, and a responsive Material Design interface.

## Features

- ✅ **Add, Edit, and Delete Tasks** – Manage your to-do items with ease
- 💾 **Persistent Storage** – Tasks are saved to browser localStorage
- ✏️ **Inline Editing** – Click the pencil icon to edit tasks in place
- ✔️ **Mark as Complete** – Toggle tasks between "To-Do" and "Done"
- 📱 **Responsive Design** – Works beautifully on mobile, tablet, and desktop
- 🧪 **Fully Tested** – Unit tests with Vitest ensure reliability

## Tech Stack

- **[Vue 3](https://vuejs.org/)** – Progressive JavaScript framework with Composition API
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** – Fast build tool and dev server
- **[Vuetify](https://vuetifyjs.com/)** – Material Design component library
- **[Pinia](https://pinia.vuejs.org/)** – State management (Vue's official store)
- **[Vitest](https://vitest.dev/)** – Unit testing framework
- **[Material Design Icons](https://materialdesignicons.com/)** – Icon library

## Project Structure

```
To-Do-App/
├── src/
│   ├── components/
│   │   └── ToDoCard.vue          # Individual task card component
│   ├── stores/
│   │   └── todos.ts              # Pinia store (state management)
│   ├── data/
│   │   └── todos.json            # Seed data for first launch
│   ├── __tests__/                # Unit tests
│   ├── App.vue                   # Root component
│   └── main.ts                   # App entry point
├── index.html
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository** (or navigate to this folder):

   ```sh
   cd To-Do-App
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

### Development

Run the development server with hot-reload:

```sh
npm run dev
```

Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

### Build for Production

Compile and minify for deployment:

```sh
npm run build
```

The production-ready files will be in the `dist/` folder.

### Preview Production Build

Test the production build locally:

```sh
npm run preview
```

### Run Tests

Execute the unit test suite:

```sh
npm run test
```

## How It Works

### State Management
Tasks are stored in a **Pinia store** ([`src/stores/todos.ts`](src/stores/todos.ts)) which:
- Loads seed data from [`src/data/todos.json`](src/data/todos.json) on first launch
- Persists all changes to browser `localStorage` under the key `todo-app-data`
- Provides actions to add, update, and delete tasks

### Components
- **[App.vue](src/App.vue)** – Root component with the task list, floating "+" button, and "New Task" dialog
- **[ToDoCard.vue](src/components/ToDoCard.vue)** – Reusable card for each task with view/edit modes

### Data Flow
1. User clicks **"+"** → opens dialog
2. User fills form and clicks **"Add"** → `store.addTodo()` is called
3. Store updates reactive state and persists to `localStorage`
4. Vue automatically re-renders the task list
5. Clicking **edit** or **delete** on a card emits events → handled by store actions

## TypeScript Support

This project uses TypeScript for type safety. Key interfaces:

```ts
interface Todo {
  id: number
  header: string
  description: string
  done: boolean
}
```

## Learn More

- [Vue 3 Composition API Docs](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify 3 Component API](https://vuetifyjs.com/en/components/all/)
- [Pinia Store Guide](https://pinia.vuejs.org/core-concepts/)
- [Vite Configuration Reference](https://vitejs.dev/config/)

## License

This project is part of a Vue practice workspace and is provided as-is for learning purposes.
