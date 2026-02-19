<script setup lang="ts">
  import { ref, computed } from "vue";
  import TaskForm  from "./components/TaskForm.vue";
  import TaskList from "./components/TaskList.vue";
  import type { Task, TaskFilter } from "./types.ts";
  import FilterSelect from "./components/FilterSelect.vue";

  const title = ref("Task App");
  const tasks = ref<Task[]>([]);
  const filter = ref<TaskFilter>("all");

  function addTask(newTask: string){
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    });
  }
  function removeTask(id: string){
    tasks.value = tasks.value.filter(task => task.id !== id);
  }

  function toggleDone(id: string){
    const task = tasks.value.find(task => task.id === id);
    if(task){
      task.done = !task.done;
    }
  }

  const totalDone = computed(() => tasks.value.filter(task => task.done).length);

  const filteredTasks = computed(() => {
    if(filter.value === "done") return tasks.value.filter(task => task.done);
    if(filter.value === "todo") return tasks.value.filter(task => !task.done);
    return tasks.value;
  });
</script>

<script lang="ts">
  export default{
      name: 'Task App',
  };
</script>

<template>
  <main class="dark">
    <h1>{{ title }}</h1>
    <TaskForm @add-task="addTask"/>
    <h3 v-if="tasks.length < 1">Add a task to get started.</h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks done.</h3>
    <div v-if="tasks.length > 0" class="task-filter">
      <FilterSelect :filter="filter" @update-filter="filter = $event"/>
    </div>
    <TaskList :tasks="filteredTasks" @toggle-task="toggleDone" @remove-task="removeTask"/>
  </main>
</template>

<style scoped>
main{
  max-width: 800px;
  margin: 1rem auto;
}
.button-container{
  display: flex;
  justify-content: end;
  gap: .5rem;
  margin-bottom: 1rem;
}

.task-filter{
  display: flex;
  justify-content: end;
  margin-bottom: 1rem;

  select{
    width: 300px;
  }
}
</style>
