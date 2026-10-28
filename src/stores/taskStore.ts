import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '../types/task'
import { getTasks } from '../services/taskApi'
import { createTask } from '../services/taskApi'
import { deleteTask as deleteTaskApi } from '../services/taskApi'
import { updateTask as updateTaskApi } from '../services/taskApi'
const loading = ref(false)
const error = ref<string | null>(null)

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  async function loadTasks() {
    loading.value = true
    error.value = null

    try {
      tasks.value = await getTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load tasks'
    } finally {
      loading.value = false
    }
  }

  async function addTask(title: string) {
    error.value = null

    try {
      const newTask = await createTask(title)
      tasks.value.push(newTask)
    } catch (err) {
      handleError(err)
    }
  }

  async function deleteTask(id: number) {
    error.value = null

    try {
      await deleteTaskApi(id)
      tasks.value = tasks.value.filter((task) => task.id !== id)
    } catch (err) {
      handleError(err)
    }
  }

  async function toggleTask(id: number) {
    error.value = null

    const task = tasks.value.find((task) => task.id === id)
    if (!task) return

    try {
      const updatedTask = await updateTaskApi(id, {
        completed: !task.completed,
      })

      tasks.value = tasks.value.map((task) => (task.id === id ? updatedTask : task))
    } catch (err) {
      handleError(err)
    }
  }

  async function editTask(id: number, title: string) {
    error.value = null

    try {
      const updatedTask = await updateTaskApi(id, { title })

      tasks.value = tasks.value.map((task) => (task.id === id ? updatedTask : task))
    } catch (err) {
      handleError(err)
    }
  }

  async function clearTasks() {
    error.value = null

    try {
      const ids = tasks.value.map((task) => task.id)

      await Promise.all(ids.map((id) => deleteTaskApi(id)))
      tasks.value = []
    } catch (err) {
      handleError(err)
      await loadTasks()
    }
  }

  function handleError(err: unknown) {
    error.value = err instanceof Error ? err.message : 'Something went wrong'
  }

  const taskCount = computed(() => tasks.value.length)

  const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)

  const pendingCount = computed(() => tasks.value.filter((task) => !task.completed).length)

  return {
    tasks,
    taskCount,
    completedCount,
    pendingCount,
    loading,
    error,
    loadTasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearTasks,
  }
})
