<script setup lang="ts">
defineProps<{
  total: number
  completed: number
  pending: number
}>()
</script>

<template>
  <div>
    <h2>My stats:</h2>
    <p>Total: {{ total }}</p>
    <p>Completed: {{ completed }}</p>
    <p>Pending: {{ pending }}</p>
  </div>
</template>
