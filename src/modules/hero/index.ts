import { registerModule } from '../registry'
import HeroComponent from './Hero.vue'

registerModule({
  name: 'hero',
  title: 'Hero Section',
  description: 'A sample hero section component',
  component: HeroComponent,
})