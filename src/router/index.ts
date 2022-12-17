import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AccountsView from '@/views/AccountsView.vue'
import ExtractView from '@/views/ExtractView.vue'
import ExtractByAccountView from '@/views/ExtractByAccountView.vue'
import AddManualTransactionView from '@/views/AddManualTransactionView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import TransactionView from '@/views/TransactionView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CalendarView from '../views/CalendarView.vue'
import AddBillView from '../views/AddBillView.vue'
import BillView from '../views/BillView.vue'
import PluggyConnectWidgetView from '../views/PluggyConnectWidgetView.vue'
import ConnectAccountView from '../views/ConnectAccountView.vue'
import AddManualAccountView from '../views/AddManualAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { top: 0 }
    // }
  },
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,
    },
    {
      path: '/accounts/connect',
      name: 'accounts-connect',
      component: ConnectAccountView,
    },
    {
      path: '/accounts/connect/manual',
      name: 'accounts-connect-manual',
      component: AddManualAccountView,
    },
    {
      path: '/extract',
      name: 'extract',
      component: ExtractView,
    },
    {
      path: '/extract/:id',
      name: 'extract-by-account',
      component: ExtractByAccountView,
    },
    {
      path: '/add-transaction',
      name: 'add-transaction',
      component: AddManualTransactionView,
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView, // @deprecated
    },
    {
      path: '/transactions/:id',
      name: 'transaction',
      component: TransactionView,
    },
    {
      path: '/bills',
      name: 'bills',
      component: CalendarView,
    },
    {
      path: '/bills/:id',
      name: 'bill',
      component: BillView,
    },
    {
      path: '/add-bill',
      name: 'add-bill',
      component: AddBillView,
    },
    {
      path: '/pluggy-connect',
      name: 'pluggy-connect',
      component: PluggyConnectWidgetView, // @deprecated
    },
  ]
})

export default router
