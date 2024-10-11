<template>
  <div class="text-media" :class="{ reversed: isReversed }">
    <div class="text-content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <button @click="toggleLayout">Toggle Layout</button>
    </div>
    <div class="media-content">
      <img :src="imageUrl" :alt="imageAlt">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import './TextMedia.css'

const title = 'Text & Media Section'
const description = 'This section demonstrates a flexible layout with text content on one side and an image on the other. You can toggle the layout to switch the positions of text and image.'
const imageUrl = 'https://picsum.photos/400/300'
const imageAlt = 'Random image from Lorem Picsum'

const isReversed = ref(false)

function toggleLayout() {
  isReversed.value = !isReversed.value
}
</script>