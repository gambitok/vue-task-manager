<script setup lang="ts">
import { useTasks } from '@/composables/useTasks'
import { useTaskStore } from '../stores/taskStore'

import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskStats from '@/components/tasks/TaskStats.vue'
import TaskList from '@/components/tasks/TaskList.vue'

const taskStore = useTaskStore()
const {
  tasks,
  taskCount,
  completedCount,
  pendingCount,
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  clearTasks,
} = useTasks()
</script>

<template>
  <h1>Tasks</h1>

  <p>Count: {{ taskStore.count }}</p>
  <button @click="taskStore.increment()">Increment</button>

  <TaskStats :total="taskCount" :completed="completedCount" :pending="pendingCount" />

  <TaskForm @add="addTask" />

  <TaskList :tasks="tasks" @delete="deleteTask" @toggle="toggleTask" @edit="editTask" />

  <button v-if="tasks.length" @click="clearTasks">Clear All</button>
</template>
