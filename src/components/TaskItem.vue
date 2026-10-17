<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id: number
  title: string
  completed: boolean
}>()

const emit = defineEmits<{
  delete: [id: number]
  edit: [id: number, title: string]
  toggle: [id: number]
}>()

const isEditing = ref(false)
const editedTitle = ref(props.title)

function startEditing() {
  editedTitle.value = props.title
  isEditing.value = true
}

function saveTask() {
  if (!editedTitle.value.trim()) return

  emit('edit', props.id, editedTitle.value.trim())
  isEditing.value = false
}
</script>

<template>
  <li>
    <template v-if="isEditing">
      <input v-model="editedTitle" />
      <button @click="saveTask">Save</button>
    </template>

    <template v-else>
      {{ title }}

      <input type="checkbox" :checked="completed" @change="emit('toggle', id)" />

      <button @click="startEditing">Edit</button>
      <button @click="emit('delete', id)">Delete</button>
    </template>
  </li>
</template>
