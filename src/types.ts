import { Component } from 'vue'

export interface PageModule {
  name: string
  title: string
  description: string
  component: Component
}

export interface PlaygroundConfig {
  modules: PageModule[]
}