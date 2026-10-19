<script setup lang="ts">
import TaskItem from './TaskItem.vue'

import type { Task } from '@/types/task'

defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  delete: [id: number]
  toggle: [id: number]
  edit: [id: number, title: string]
}>()
</script>

<template>
  <div v-if="tasks.length > 0">
    <p>Saved Tasks:</p>

    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        @delete="emit('delete', $event)"
        @toggle="emit('toggle', $event)"
        @edit="(id, title) => emit('edit', id, title)"
      />
    </ul>
  </div>

  <p v-else>No tasks yet.</p>
</template>
