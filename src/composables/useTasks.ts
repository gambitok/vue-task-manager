import { ref, computed, watch, onMounted } from 'vue'

import type { Task } from '@/types/task'

export function useTasks() {
  const tasks = ref<Task[]>([])

  const taskCount = computed(() => tasks.value.length)

  const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)

  const pendingCount = computed(() => tasks.value.filter((task) => !task.completed).length)

  function addTask(title: string) {
    if (!title.trim()) return

    tasks.value.push({
      id: Date.now(),
      title: title.trim(),
      completed: false,
    })
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

    if (task && title.trim()) {
      task.title = title.trim()
    }
  }

  function clearTasks() {
    tasks.value = []
  }

  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks) as Task[]
    }
  })

  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('tasks', JSON.stringify(newTasks))
    },
    { deep: true },
  )

  return {
    tasks,
    taskCount,
    completedCount,
    pendingCount,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearTasks,
  }
}
