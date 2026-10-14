<script setup lang="ts">
  import {ref, computed} from "vue";

  const taskName = ref<string>('')
  const tasks = ref<string[]>([])

  const taskCount = computed(() => tasks.value.length)

  function addTask() {
    if (!taskName.value.trim()) return
    tasks.value.push(taskName.value.trim())
    taskName.value = ''
  }

  function clearTasks() {
    tasks.value = []
  }

  function deleteTask(index: number) {
    tasks.value.splice(index, 1)
  }
</script>

<template>
  <input v-model="taskName" placeholder="Enter task name">
  <button @click="addTask">Add Task</button>
  <div v-if="tasks.length > 0">
    <p>Task Count: {{ taskCount }}</p>
    <p>Saved Task:</p>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task }}
        <button @click="deleteTask(index)">X</button>
      </li>
    </ul>
  </div>
  <button @click="clearTasks">Clear</button>
</template>

<style scoped>

</style>
