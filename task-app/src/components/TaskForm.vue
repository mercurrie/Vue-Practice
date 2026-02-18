<script setup lang="ts">
    import { ref } from 'vue';

    const newTask = ref("");
    const errorValue = ref("");

    const emit = defineEmits<{
        addTask: [newTask: string]
    }>();

    function formSubmitted(){
        if(newTask.value.trim()){
            emit("addTask", newTask.value.trim());
            newTask.value = "";
        }else{
            errorValue.value = "Task Cannot Be Empty!";
        }
    }
</script>

<script lang="ts">
    export default{
        name: 'TaskForm',
    };
</script>

<template>
    <form @submit.prevent="formSubmitted">
      <label for="">
        <input 
        placeholder="New Task" 
        @input="errorValue = ''" 
        :aria-invalid="!!errorValue || undefined" 
        v-model="newTask" 
        name="newTask" 
        type="text">
        <small v-if="errorValue" id="invalid-helper">
            {{errorValue}}
        </small>
    </label>
      <div class="button-container"">
        <button >Add</button>
      </div>
    </form>
</template>

<style scoped>

    .button-container{
        display: flex;
        justify-content: end;
    }
</style>