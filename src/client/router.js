import Index from './pages/Index'
import Letter from './pages/Letter'

export default [
  { path: '/', component: Index },
  { path: '/:letterId', component: Letter }
]
