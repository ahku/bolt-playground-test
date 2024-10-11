<template>
  <div class="hero">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button @click="incrementCount">Count: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import './Hero.css'

const title = 'Welcome to the Hero Section'
const description = 'This is a sample hero component for the playground.'
const count = ref(0)

function incrementCount() {
  count.value++
}
</script>