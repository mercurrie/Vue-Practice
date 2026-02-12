<script setup lang="ts">
// <script setup> is Vue 3's shorthand for the Composition API.
// Everything declared here is automatically available in the template below.

import { ref } from 'vue'
import ToDoCard from './components/ToDoCard.vue'
import { useTodoStore } from './stores/todos'

// Access the Pinia store. `store.todos` is reactive — when the store
// changes, the template re-renders automatically.
const store = useTodoStore()

// Validation rule for Vuetify inputs. Returns true if valid,
// or an error message string if invalid. Vuetify's :rules prop
// expects an array of these functions.
const required = (v: string) => !!v?.trim() || 'This field is required'

// Local UI state for the "New Task" dialog — these don't belong in
// the Pinia store because they're only relevant to this component.
const dialog = ref(false)       // Controls whether the dialog is open
const newHeader = ref('')       // Two-way bound to the header input
const newDescription = ref('')  // Two-way bound to the description input

// Called when the user clicks "Add" in the dialog.
// Delegates to the store, then resets the form and closes the dialog.
function addTodo() {
  store.addTodo(newHeader.value, newDescription.value)
  newHeader.value = ''
  newDescription.value = ''
  dialog.value = false
}
</script>

<template>
  <!-- v-app is the root Vuetify component — required for themes and layout to work -->
  <v-app>
    <!-- Top navigation bar -->
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title>To-Do App</v-app-bar-title>
    </v-app-bar>

    <!-- v-main wraps the page content and accounts for the app-bar height -->
    <v-main>
      <v-container>
        <!-- v-row + v-col create a responsive grid layout.
             cols="12" = full width on mobile, sm="6" = half on small screens, md="4" = third on medium+ -->
        <v-row>
          <v-col v-for="todo in store.todos" :key="todo.id" cols="12" sm="6" md="4">
            <!-- :todo passes data down (prop), @update/@delete listen for events emitted up -->
            <ToDoCard :todo="todo" @update="store.updateTodo" @delete="store.deleteTodo" />
          </v-col>
        </v-row>

        <!-- Floating action button (FAB) pinned to bottom-right corner -->
        <v-btn
          icon="mdi-plus"
          color="primary"
          size="large"
          position="fixed"
          location="bottom end"
          class="ma-4"
          @click="dialog = true"
        />

        <!-- v-dialog is a modal popup. v-model="dialog" binds its open/close state
             to our reactive `dialog` ref — setting it to false closes the dialog. -->
        <v-dialog v-model="dialog" max-width="500">
          <v-card title="New Task">
            <v-card-text>
              <!-- v-model creates two-way binding: typing updates the ref, and changing
                   the ref updates the input. :rules runs validation on every change. -->
              <v-text-field v-model="newHeader" label="Header" variant="outlined" density="compact" class="mb-2" :rules="[required]" />
              <v-textarea v-model="newDescription" label="Description" variant="outlined" density="compact" rows="3" :rules="[required]" />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
              <!-- :disabled dynamically disables the button when either field is empty -->
              <v-btn color="primary" variant="flat" :disabled="!newHeader.trim() || !newDescription.trim()" @click="addTodo">Add</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>
