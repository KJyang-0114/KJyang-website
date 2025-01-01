import { createApp } from 'vue'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createVuestic({
  config: {
    colors: {
      variables: {
        primary: '#6366f1',
        secondary: '#4f46e5',
        success: '#22c55e',
        info: '#3b82f6',
        danger: '#ef4444',
        warning: '#f59e0b',
      }
    }
  }
}))

app.mount('#app')
