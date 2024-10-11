import { registerModule } from '../registry'
import TextMediaComponent from './TextMedia.vue'

registerModule({
  name: 'text-media',
  title: 'Text & Media',
  description: 'A two-column layout with text and media',
  component: TextMediaComponent,
})