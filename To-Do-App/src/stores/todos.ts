// defineStore is Pinia's way of creating a "store" — a centralized place
// to keep state (data) that multiple components can share and react to.
import { defineStore } from 'pinia'

// ref() creates reactive data — when the value changes, any component
// using it will automatically re-render.
import { ref } from 'vue'

// Our dummy seed data loaded from a JSON file. This is only used on
// first launch when localStorage is empty.
import seedTodos from '../data/todos.json'

// TypeScript interface — defines the shape of a Todo object so we get
// autocomplete and type-checking throughout the app.
export interface Todo {
  id: number
  header: string
  description: string
  done: boolean
}

// The key used to store/retrieve our todos in the browser's localStorage.
const STORAGE_KEY = 'todo-app-data'

// Loads todos from localStorage if they exist, otherwise falls back
// to the seed data from todos.json.
function loadTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    // JSON.parse converts the stored string back into a JS array
    return JSON.parse(saved)
  }
  // .map() creates a shallow copy of each seed todo so we don't
  // accidentally mutate the original imported data
  return seedTodos.map((t) => ({ ...t }))
}

// defineStore('todos', () => { ... }) creates a Pinia store using the
// "setup" syntax (similar to <script setup> in components).
// The first argument 'todos' is a unique ID for this store.
// Everything returned at the bottom becomes accessible to components.
export const useTodoStore = defineStore('todos', () => {
  // The single source of truth for all todos in the app.
  // ref<Todo[]> tells TypeScript this is a reactive array of Todo objects.
  const todos = ref<Todo[]>(loadTodos())

  // Helper that saves the current todos array to localStorage.
  // Called after every change so data survives page refreshes.
  function persist() {
    // JSON.stringify converts our JS array into a string for storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

  // Adds a new todo to the list.
  // Generates a unique ID by finding the current highest ID and adding 1.
  function addTodo(header: string, description: string) {
    const maxId = todos.value.reduce((max, t) => Math.max(max, t.id), 0)
    todos.value.push({
      id: maxId + 1,
      header,
      description,
      done: false,
    })
    persist()
  }

  // Replaces an existing todo with an updated version.
  // Finds the todo by ID, then swaps it in the array.
  function updateTodo(updated: Todo) {
    const idx = todos.value.findIndex((t) => t.id === updated.id)
    if (idx !== -1) {
      todos.value[idx] = updated
      persist()
    }
  }

  // Removes a todo by filtering it out of the array.
  // .filter() returns a new array with only the items that pass the test.
  function deleteTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id)
    persist()
  }

  // Only what's returned here is accessible to components via useTodoStore().
  // `todos` is the reactive state; the functions are "actions" that modify it.
  return { todos, addTodo, updateTodo, deleteTodo }
})
