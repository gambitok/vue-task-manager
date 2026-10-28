<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <h1>Home</h1>

  <p>Count: {{ taskStore.count }}</p>
  <button @click="taskStore.increment()">Increment from Home</button>
</template>
