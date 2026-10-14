<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)
const name = ref('')

function increment() {
  count.value++
}

function incrementMore(value: number = 1) {
  count.value += value
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>

<template>
  <h2>Counter: {{ count }}</h2>

  <p v-if="count > 0">Positive</p>
  <p v-else-if="count < 0">Negative</p>
  <p v-else>Zero</p>

  <button @click="increment">+</button>
  <button @click="incrementMore(5)">+5</button>
  <button @click="decrement">-</button>
  <button @click="reset">Reset</button>

  <h2>Model: </h2>
  <input v-model="name" placeholder="Enter name">

  <p>Hello, {{ name }}</p>
</template>

<style scoped>
button {
  padding: 10px 20px;
}
</style>
