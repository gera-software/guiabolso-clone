import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import IncomeBonusIcon from '@/components/icons/IncomeBonusIcon.vue'
import IncomeLoanIcon from '@/components/icons/IncomeLoanIcon.vue'
import NewCategoryIcon from '@/components/icons/NewCategoryIcon.vue'
import IncomeOtherIcon from '@/components/icons/IncomeOtherIcon.vue'
import IncomeWageIcon from '@/components/icons/IncomeWageIcon.vue'
import IncomeReturnIcon from '@/components/icons/IncomeReturnIcon.vue'


const app = createApp(App)
app.use(router)

app.component('IncomeBonusIcon', IncomeBonusIcon)
app.component('IncomeLoanIcon', IncomeLoanIcon)
app.component('NewCategoryIcon', NewCategoryIcon)
app.component('IncomeOtherIcon', IncomeOtherIcon)
app.component('IncomeWageIcon', IncomeWageIcon)
app.component('IncomeReturnIcon', IncomeReturnIcon)

app.mount('#app')
