<script setup lang="ts">
  import { ref } from "vue";  
  import TaskForm  from "./components/TaskForm.vue";
  import type {Task} from "./types.ts";

  const title = ref("Task App");
  const tasks = ref<Task[]>([]);

  function addTask(newTask: string){
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false
    });
  }


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
    <h3>There are {{ tasks.length }} tasks in the list</h3>
  </main>
</template>

<style scoped>
main{
  max-width: 800px;
  margin: 1rem auto;
}
</style>
