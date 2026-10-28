import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../types/task'
import { getTasks } from '../services/taskApi'
import { createTask } from '../services/taskApi'
import { deleteTask as deleteTaskApi } from '../services/taskApi'
import { updateTask as updateTaskApi } from '../services/taskApi'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  async function loadTasks() {
    tasks.value = await getTasks()
  }

  async function addTask(title: string) {
    const newTask = await createTask(title)
    tasks.value.push(newTask)
  }

  async function deleteTask(id: number) {
    await deleteTaskApi(id)
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  async function toggleTask(id: number) {
    const task = tasks.value.find((task) => task.id === id)

    if (!task) return

    const updatedTask = await updateTaskApi(id, {
      completed: !task.completed,
    })

    tasks.value = tasks.value.map((task) => (task.id === id ? updatedTask : task))
  }

  async function editTask(id: number, title: string) {
    const updatedTask = await updateTaskApi(id, { title })

    tasks.value = tasks.value.map((task) => (task.id === id ? updatedTask : task))
  }

  async function clearTasks() {
    const ids = tasks.value.map((task) => task.id)

    await Promise.all(ids.map((id) => deleteTaskApi(id)))

    tasks.value = []
  }

  const taskCount = computed(() => tasks.value.length)

  const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)

  const pendingCount = computed(() => tasks.value.filter((task) => !task.completed).length)

  return {
    tasks,
    taskCount,
    completedCount,
    pendingCount,
    loadTasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearTasks,
  }
})
