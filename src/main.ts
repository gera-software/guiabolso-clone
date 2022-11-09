import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import IncomeBonusIcon from '@/components/icons/IncomeBonusIcon.vue'


const app = createApp(App)
app.use(router)

app.component('IncomeBonusIcon', IncomeBonusIcon)

app.mount('#app')
