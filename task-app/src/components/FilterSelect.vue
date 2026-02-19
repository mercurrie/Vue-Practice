<script lang="ts" setup>
import type { TaskFilter } from "../types.ts";

const props = defineProps<{
  filter: TaskFilter;
}>();

const emit = defineEmits<{
  updateFilter: [filter: TaskFilter]
}>();
</script>

<template>
  <select name="filterDropDown" id="filterDropDown" :value="props.filter" @change="emit('updateFilter', ($event.target as HTMLSelectElement).value as TaskFilter)">
    <option value="all">All</option>
    <option value="todo">ToDo</option>
    <option value="done">Done</option>
  </select>
</template>

<style>

</style>
