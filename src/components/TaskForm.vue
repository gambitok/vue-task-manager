<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

import TaskStats from '@/components/TaskStats.vue'
import TaskItem from '@/components/TaskItem.vue'

interface Task {
  id: number
  title: string
  completed: boolean
}

const tasks = ref<Task[]>([])

const taskName = ref<string>('')
const taskCount = computed(() => tasks.value.length)
const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)
const pendingCount = computed(() => tasks.value.filter((task) => !task.completed).length)

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')

  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks) as Task[]
  }
})

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

function toggleTask(id: number) {
  const task = tasks.value.find((task) => task.id === id)

  if (task) {
    task.completed = !task.completed
  }
}

function editTask(id: number, title: string) {
  const task = tasks.value.find((task) => task.id === id)

  if (task) {
    task.title = title
  }
}

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  },
  { deep: true }, // Enable deep watching for nested properties
)
</script>

<template>
  <TaskStats :total="taskCount" :completed="completedCount" :pending="pendingCount" />
  <form @submit.prevent="addTask">
    <input v-model="taskName" placeholder="Enter task name" />
    <button type="submit">Add Task</button>
  </form>
  <div v-if="tasks.length > 0">
    <p>Saved Task:</p>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        @delete="deleteTask"
        @edit="editTask"
        @toggle="toggleTask"
      />
    </ul>
  </div>
  <button v-if="tasks.length" @click="clearTasks">Clear All</button>
</template>

<style scoped></style>
