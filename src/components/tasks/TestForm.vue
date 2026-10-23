<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  add: [title: string]
  delete: [id: number]
}>()

const testName = ref('')

function submitTest() {
  const title = testName.value.trim()

  if (!title) return

  emit('add', title)
  testName.value = ''
}
</script>

<template>
  <form @submit.prevent="submitTest">
    <input v-model="testName" placeholder="Enter test name" />
    <button type="submit">+ Add Test</button>
  </form>
</template>
