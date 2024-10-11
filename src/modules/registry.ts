import { PageModule } from '../types'

const modules: PageModule[] = []

export function registerModule(module: PageModule) {
  modules.push(module)
}

export function getModules(): PageModule[] {
  return modules
}