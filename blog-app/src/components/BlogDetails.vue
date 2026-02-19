<template>
    <v-container>
        <v-row>
        <v-col>
            <h1>Blog Details - ID: {{ blogId }}</h1>
            <!-- Display blog details here -->
        </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>

const route = useRoute()
const blogId = route.params.id;

</script>
