<script setup lang="ts">
import { useTests } from '@/composables/useTests'
import TestForm from '@/components/tasks/TestForm.vue'
import TestItem from '@/components/tasks/TestItem.vue'

const { tests, addTest, deleteTest, editTest } = useTests()
</script>

<template>
  <h1>Tests</h1>

  <TestForm @add="addTest" />

  <ul>
    <TestItem
      v-for="test in tests"
      :key="test.id"
      :id="test.id"
      :title="test.title"
      @delete="deleteTest"
      @edit="editTest"
    />
  </ul>
</template>
