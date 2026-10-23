import { ref, watch, onMounted } from 'vue'

import type { Test } from '@/types/test'

export function useTests() {
  const tests = ref<Test[]>([])

  function addTest(title: string) {
    if (!title.trim()) return

    tests.value.push({
      id: Date.now(),
      title: title.trim(),
      completed: false,
    })
  }

  function deleteTest(id: number) {
    tests.value = tests.value.filter((test) => test.id !== id)
  }

  function toggleTest(id: number) {
    const test = tests.value.find((test) => test.id === id)

    if (test) {
      test.completed = !test.completed
    }
  }

  function editTest(id: number, title: string) {
    const test = tests.value.find((test) => test.id === id)

    if (test && title.trim()) {
      test.title = title.trim()
    }
  }

  onMounted(() => {
    const savedTests = localStorage.getItem('tests')

    if (savedTests) {
      tests.value = JSON.parse(savedTests) as Test[]
    }
  })

  watch(
    tests,
    (newTests) => {
      localStorage.setItem('tests', JSON.stringify(newTests))
    },
    { deep: true },
  )

  return {
    tests,
    addTest,
    deleteTest,
    toggleTest,
    editTest,
  }
}
