<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'

import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskStats from '@/components/tasks/TaskStats.vue'
import TaskList from '@/components/tasks/TaskList.vue'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadTasks()
})
</script>

<template>
  <h1>Tasks</h1>

  <p v-if="taskStore.error" style="color: red">
    {{ taskStore.error }}
  </p>

  <p v-if="taskStore.loading">Loading tasks...</p>

  <template v-else>
    <TaskStats
      :total="taskStore.taskCount"
      :completed="taskStore.completedCount"
      :pending="taskStore.pendingCount"
    />

    <TaskForm @add="taskStore.addTask" />

    <TaskList
      :tasks="taskStore.tasks"
      @delete="taskStore.deleteTask"
      @toggle="taskStore.toggleTask"
      @edit="taskStore.editTask"
    />

    <button v-if="taskStore.tasks.length" @click="taskStore.clearTasks()">Clear All</button>
  </template>
</template>
