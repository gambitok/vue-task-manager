<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
  <h1>Home</h1>
  <p>Total tasks: {{ taskStore.taskCount }}</p>
</template>
