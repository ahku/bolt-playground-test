<template>
  <div class="playground">
    <nav v-if="modules.length > 0">
      <ul>
        <li v-for="module in modules" :key="module.name">
          <router-link :to="{ name: module.name }">{{ module.title }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="resizable-container">
      <router-view></router-view>
      <iframe ref="iframe" :src="currentRoute" @load="updateIframeContent"></iframe>
      <div class="resize-handle" @mousedown="startResize"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getModules } from '../modules/registry'

const modules = computed(() => getModules())
const router = useRouter()
const route = useRoute()

const iframe = ref<HTMLIFrameElement | null>(null)
const currentRoute = computed(() => router.resolve(route.fullPath).href)

function updateIframeContent() {
  if (iframe.value) {
    const iframeDoc = iframe.value.contentDocument || iframe.value.contentWindow?.document
    if (iframeDoc) {
      iframeDoc.open()
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            <div id="app">Hello</div>
            <script type="module" src="/src/main.ts"><\/script>
          </body>
        </html>
      `)
      iframeDoc.close()
    }
  }
}

// Resizing functionality
let isResizing = false
const startResize = (e: MouseEvent) => {
  isResizing = true
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', stopResize)
}

const resize = (e: MouseEvent) => {
  if (isResizing && iframe.value) {
    const newWidth = e.clientX - iframe.value.getBoundingClientRect().left
    iframe.value.style.width = `${newWidth}px`
  }
}

const stopResize = () => {
  isResizing = false
  document.removeEventListener('mousemove', resize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  window.addEventListener('resize', updateIframeContent)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIframeContent)
})
</script>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

nav {
  background-color: #f0f0f0;
  padding: 10px 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin: 0 10px;
}

nav a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #e0e0e0;
}

nav a.router-link-active {
  font-weight: bold;
  color: #4CAF50;
  background-color: #e0e0e0;
}

.resizable-container {
  flex-grow: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}

iframe {
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 100%;
}

.resize-handle {
  width: 10px;
  height: 100%;
  background-color: #f0f0f0;
  cursor: ew-resize;
  position: absolute;
  right: 0;
  top: 0;
}
</style>