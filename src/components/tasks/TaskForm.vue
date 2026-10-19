<script setup lang="ts">
import { ref } from 'vue'

const taskName = ref('')

const emit = defineEmits<{
  add: [title: string]
}>()

function submitTask() {
  const title = taskName.value.trim()

  if (!title) return

  emit('add', title)
  taskName.value = ''
}
</script>

<template>
  <form @submit.prevent="submitTask">
    <input v-model="taskName" placeholder="Enter task name" />
    <button type="submit">Add Task</button>
  </form>
</template>
