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
import EssentialResidentialBillsIcon from '@/components/icons/EssentialResidentialBillsIcon.vue'
import EssentialEducationIcon from '@/components/icons/EssentialEducationIcon.vue'
import EssentialMarketIcon from '@/components/icons/EssentialMarketIcon.vue'
import EssentialLivingIcon from '@/components/icons/EssentialLivingIcon.vue'
import EssentialHealthIcon from '@/components/icons/EssentialHealthIcon.vue'
import EssentialCommuteIcon from '@/components/icons/EssentialCommuteIcon.vue'


const app = createApp(App)
app.use(router)

app.component('IncomeBonusIcon', IncomeBonusIcon)
app.component('IncomeLoanIcon', IncomeLoanIcon)
app.component('NewCategoryIcon', NewCategoryIcon)
app.component('IncomeOtherIcon', IncomeOtherIcon)
app.component('IncomeWageIcon', IncomeWageIcon)
app.component('IncomeReturnIcon', IncomeReturnIcon)

app.component('EssentialResidentialBillsIcon', EssentialResidentialBillsIcon)
app.component('EssentialEducationIcon', EssentialEducationIcon)
app.component('EssentialMarketIcon', EssentialMarketIcon)
app.component('EssentialLivingIcon', EssentialLivingIcon)
app.component('EssentialHealthIcon', EssentialHealthIcon)
app.component('EssentialCommuteIcon', EssentialCommuteIcon)

app.mount('#app')
