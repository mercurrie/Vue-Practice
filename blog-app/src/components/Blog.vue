<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(blog, index) in blogs"
        :key="index"
        class="blog-post"
        cols="12"
        lg="4"
        md="6"
      >
        <v-card class="pa-5">
          <v-card-title>{{ blog.title }}</v-card-title>
          <v-card-subtitle>{{ blog.date }}</v-card-subtitle>
          <v-card-text>
            <p>{{ blog.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn>Read More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end">
      <v-btn><v-icon icon="mdi-plus" /></v-btn>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import type { Blog } from '@/types'
  import { ref } from 'vue'
  import blogsData from '../data/blogs.json'

  const blogs = ref<Blog[]>(blogsData)

</script>

<style scoped>
.blog-post {
  transition: transform 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
  }
  :hover :deep(.v-btn) {
  /* Change the background color on card hover */
  background-color: rgb(46, 46, 46);
  opacity: 1;
}
}
</style>
