<script setup lang="ts">
import { ref, computed } from 'vue'

const taskName = ref<string>('')
const taskCount = computed(() => tasks.value.length)
const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)
const pendingCount = computed(() => tasks.value.filter((task) => !task.completed).length)

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasks = ref<Task[]>([])

function addTask() {
  if (!taskName.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    title: taskName.value.trim(),
    completed: false,
  })
  taskName.value = ''
}

function clearTasks() {
  tasks.value = []
}

function deleteTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <form @submit.prevent="addTask">
    <input v-model="taskName" placeholder="Enter task name" />
    <button type="submit">Add Task</button>
  </form>
  <div v-if="tasks.length > 0">
    <p>Total: {{ taskCount }}</p>
    <p>Completed: {{ completedCount }}</p>
    <p>Pending: {{ pendingCount }}</p>
    <p>Saved Task:</p>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <input type="checkbox" v-model="task.completed" />
        <button @click="deleteTask(task.id)">X</button>
      </li>
    </ul>
  </div>
  <button v-if="tasks.length" @click="clearTasks">Clear All</button>
</template>

<style scoped></style>
