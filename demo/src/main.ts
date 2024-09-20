import { createHead } from '@vueuse/head'
import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.scss'
import './styles/markdown.scss'

import 'uno.css'

const app = createApp(App)
const head = createHead()

app.use(head)

app.mount('#app')
