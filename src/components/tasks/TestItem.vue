<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id: number
  title: string
}>()

const emit = defineEmits<{
  delete: [id: number]
  edit: [id: number, title: string]
}>()

function deleteTest() {
  emit('delete', props.id)
}

function editTest() {
  const title = editableTest.value.trim()

  if (!title) return

  emit('edit', props.id, title)
  isEditing.value = false
}
const isEditing = ref(false)

const editableTest = ref(props.title)
</script>

<template>
  <li>
    <template v-if="isEditing">
      <input v-model="editableTest" />
      <button @click="editTest">Save</button>
    </template>

    <template v-else>
      <span>{{ title }}</span>
      <button @click="isEditing = true">Edit</button>
    </template>
    <button @click="deleteTest">x Delete</button>
  </li>
</template>
