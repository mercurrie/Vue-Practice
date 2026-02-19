<script setup lang="ts">
    import type { Task } from '../types.ts';

    const props = defineProps<{
        tasks: Task[]
    }>();

    const emits = defineEmits<{
        toggleTask: [id: string]
        removeTask: [id: string]
    }>();
</script>

<script lang="ts">
    export default {
        name: 'TaskList',
    };
</script>

<template>
    <TransitionGroup name="list" tag="div" class="task-list">
        <article class="task-container" v-for="task in props.tasks" :key="task.id">
            <label for="">
                <input type="checkbox" @input="emits('toggleTask', task.id)" :checked="task.done">
                <span :class="{done: task.done}">{{ task.title }}</span>
            </label>
            <button class="outline" @click="emits('removeTask', task.id)">Remove</button>
        </article>
    </TransitionGroup>
</template>


<style scoped>
.task-lisk{
    margin-top: 1rem;
}

.done{
    text-decoration: line-through;
}
.task-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-enter-active, .list-leave-active{
    transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to{
    opacity: 0;
    transform: translateY(10px);
}
</style>
