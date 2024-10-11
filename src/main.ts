import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import './style.css'
import App from './App.vue'
import { getModules } from './modules/registry'

// Import and register modules
import './modules/hero'
import './modules/text-media'

// Create routes including dynamically generated module routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./components/ModuleRenderer.vue'),
    children: [
      { path: '', name: 'home', redirect: to => {
        const modules = getModules()
        return modules.length > 0 ? { name: modules[0].name } : { path: '/' }
      }},
      ...getModules().map(module => ({
        path: module.name,
        name: module.name,
        component: module.component,
      }))
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')