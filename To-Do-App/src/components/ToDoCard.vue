<script setup lang="ts">
import { ref } from 'vue'

// Import the Todo type from our store so both files agree on the shape.
// `import type` tells TypeScript this is types-only — it's stripped at build time.
import type { Todo } from '../stores/todos'

// defineProps declares what data this component receives from its parent.
// Here, the parent (App.vue) passes a `todo` object via :todo="todo".
// Props are read-only — you can't modify them directly.
const props = defineProps<{ todo: Todo }>()

// defineEmits declares what events this component can send to its parent.
// The parent listens with @update="..." and @delete="...".
// This is how child → parent communication works in Vue.
const emit = defineEmits<{
  (e: 'update', todo: Todo): void
  (e: 'delete', id: number): void
}>()

// Validation rule — same as in App.vue
const required = (v: string) => !!v?.trim() || 'This field is required'

// Local state for the edit mode UI
const editing = ref(false)
const editHeader = ref(props.todo.header)
const editDescription = ref(props.todo.description)

// Flips the done status and emits the updated todo to the parent.
// The spread operator (...) copies all existing fields, then overrides `done`.
function toggleDone() {
  emit('update', { ...props.todo, done: !props.todo.done })
}

// Enters edit mode — resets the edit fields to the current values
// in case the user previously cancelled an edit.
function startEdit() {
  editHeader.value = props.todo.header
  editDescription.value = props.todo.description
  editing.value = true
}

// Saves the edited values by emitting an updated todo to the parent.
function saveEdit() {
  emit('update', {
    ...props.todo,
    header: editHeader.value,
    description: editDescription.value,
  })
  editing.value = false
}

// Exits edit mode without saving — the original values remain unchanged.
function cancelEdit() {
  editing.value = false
}

</script>

<template>
  <!-- The card gets a colored left border: green if done, blue if not.
       These are Vuetify utility classes (like Tailwind but Vuetify-specific). -->
  <v-card :class="todo.done ? 'border-s-4 border-success' : 'border-s-4 border-primary'" variant="outlined">

    <!-- VIEW MODE: shown when not editing -->
    <template v-if="!editing">
      <v-card-title class="d-flex align-center justify-space-between">
        <!-- :class with an object conditionally applies classes.
             When todo.done is true, the text gets a strikethrough and faded style. -->
        <span :class="{ 'text-decoration-line-through text-medium-emphasis': todo.done }">
          {{ todo.header }}
        </span>
        <div>
          <v-btn icon="mdi-pencil" variant="text" size="small" @click="startEdit" />
          <!-- @click directly emits the delete event with the todo's ID -->
          <v-btn icon="mdi-delete" variant="text" size="small" color="error" @click="emit('delete', todo.id)" />
        </div>
      </v-card-title>
      <v-card-text :class="{ 'text-decoration-line-through text-medium-emphasis': todo.done }">
        {{ todo.description }}
      </v-card-text>
      <v-card-actions>
        <!-- :model-value is one-way binding (parent → checkbox).
             @update:model-value fires when the user clicks, triggering toggleDone.
             :label dynamically changes the text based on the done state. -->
        <v-checkbox
          :model-value="todo.done"
          :label="todo.done ? 'Done' : 'To-Do'"
          :color="todo.done ? 'success' : 'primary'"
          hide-details
          @update:model-value="toggleDone"
        />
      </v-card-actions>
    </template>

    <!-- EDIT MODE: shown when the user clicks the pencil icon -->
    <template v-else>
      <v-card-text>
        <!-- v-model creates two-way binding with our local edit refs -->
        <v-text-field v-model="editHeader" label="Header" variant="outlined" density="compact" class="mb-2" :rules="[required]" />
        <v-textarea v-model="editDescription" label="Description" variant="outlined" density="compact" rows="3" :rules="[required]" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="cancelEdit">Cancel</v-btn>
        <!-- Save is disabled until both fields have content -->
        <v-btn color="primary" variant="flat" :disabled="!editHeader.trim() || !editDescription.trim()" @click="saveEdit">Save</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
