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
import LifestyleRestaurantsIcon from '@/components/icons/LifestyleRestaurantsIcon.vue'
import LifestyleShoppingIcon from '@/components/icons/LifestyleShoppingIcon.vue'
import LifestylePersonalCareIcon from '@/components/icons/LifestylePersonalCareIcon.vue'
import LifestyleWorkExpensesIcon from '@/components/icons/LifestyleWorkExpensesIcon.vue'
import LifestyleEmployeesIcon from '@/components/icons/LifestyleEmployeesIcon.vue'
import LifestyleFamilyIcon from '@/components/icons/LifestyleFamilyIcon.vue'
import LifestyleBankTaxesIcon from '@/components/icons/LifestyleBankTaxesIcon.vue'
import LifestyleRecreationIcon from '@/components/icons/LifestyleRecreationIcon.vue'
import LifestyleOtherIcon from '@/components/icons/LifestyleOtherIcon.vue'
import LifestyleGiftsIcon from '@/components/icons/LifestyleGiftsIcon.vue'
import LifestyleWithdrawalIcon from '@/components/icons/LifestyleWithdrawalIcon.vue'
import LifestyleServicesIcon from '@/components/icons/LifestyleServicesIcon.vue'
import LifestyleTvInternetIcon from '@/components/icons/LifestyleTvInternetIcon.vue'
import LifestyleTaxesIcon from '@/components/icons/LifestyleTaxesIcon.vue'
import LifestyleTravelIcon from '@/components/icons/LifestyleTravelIcon.vue'
import LoanPayrollIcon from '@/components/icons/LoanPayrollIcon.vue'
import LoanOverdraftIcon from '@/components/icons/LoanOverdraftIcon.vue'
import LoanBillIcon from '@/components/icons/LoanBillIcon.vue'
import LoanCreditIcon from '@/components/icons/LoanCreditIcon.vue'
import LoanInterestIcon from '@/components/icons/LoanInterestIcon.vue'
import LoanCardInterestIcon from '@/components/icons/LoanCardInterestIcon.vue'
import LoanOtherIcon from '@/components/icons/LoanOtherIcon.vue'


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

app.component('LifestyleRestaurantsIcon', LifestyleRestaurantsIcon)
app.component('LifestyleShoppingIcon', LifestyleShoppingIcon)
app.component('LifestylePersonalCareIcon', LifestylePersonalCareIcon)
app.component('LifestyleWorkExpensesIcon', LifestyleWorkExpensesIcon)
app.component('LifestyleEmployeesIcon', LifestyleEmployeesIcon)
app.component('LifestyleFamilyIcon', LifestyleFamilyIcon)
app.component('LifestyleBankTaxesIcon', LifestyleBankTaxesIcon)
app.component('LifestyleRecreationIcon', LifestyleRecreationIcon)
app.component('LifestyleOtherIcon', LifestyleOtherIcon)
app.component('LifestyleGiftsIcon', LifestyleGiftsIcon)
app.component('LifestyleWithdrawalIcon', LifestyleWithdrawalIcon)
app.component('LifestyleServicesIcon', LifestyleServicesIcon)
app.component('LifestyleTvInternetIcon', LifestyleTvInternetIcon)
app.component('LifestyleTaxesIcon', LifestyleTaxesIcon)
app.component('LifestyleTravelIcon', LifestyleTravelIcon)

app.component('LoanPayrollIcon', LoanPayrollIcon)
app.component('LoanOverdraftIcon', LoanOverdraftIcon)
app.component('LoanBillIcon', LoanBillIcon)
app.component('LoanCreditIcon', LoanCreditIcon)
app.component('LoanInterestIcon', LoanInterestIcon)
app.component('LoanCardInterestIcon', LoanCardInterestIcon)
app.component('LoanOtherIcon', LoanOtherIcon)

app.mount('#app')
