<template>
  <div class="app-bar">
    <a @click="router.back()" class="icon">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </a>
    <h1>Contas e Cartões</h1>
  </div>
  <div class="container">

    <div class="card">
      <div class="card-header">Contas bancárias</div>
      <AccountSummary :account="account" v-for="account in accountsGroupedByType.BANK" :key="account._id?.toString()" />
    </div> 

    <div class="card">
      <div class="card-header">Cartões de Crédito</div>
      <AccountSummary :account="account" v-for="account in accountsGroupedByType.CREDIT_CARD" :key="account._id?.toString()" />
    </div> 

    <div class="card">
      <div class="card-header">Carteiras</div>
      <AccountSummary :account="account" v-for="account in accountsGroupedByType.WALLET" :key="account._id?.toString()" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed  } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'
import { groupBy } from 'lodash'
import { AccountSummaryDTO } from '../config/types';
import { useUserStore } from '../stores/store';
import { useRouter } from 'vue-router';
import AccountSummary from '@/components/AccountSummary.vue';

const router = useRouter()

const store =  useUserStore()

const accounts = ref<AccountSummaryDTO[]>([])

const accountsGroupedByType = computed(() => {
  return groupBy(accounts.value, (accounts) => accounts.type )
});

async function getMyAccounts(): Promise<AccountSummaryDTO[]> {
    console.log('get my accounts')
  return api.guiabolsoApi({
    method: 'get',
    url: `/accounts-fetch?id=${store.userId}`,
  }).then(function (response) {
    console.log(response.data)
    accounts.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  getMyAccounts()
})



</script>
  
<style scoped>
.app-bar {
  background-color: white;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 2;
}

.app-bar .icon {
  color: #F9386A;
}

.app-bar h1 {
  margin: 0;
  font-weight: 600;
  font-size: 22px;
  color: #404040;
  margin-left: 40px;
}

.container {
  margin-top: 60px;
}

.card {
  background-color: white;
  margin: 30px 0;
  padding: 20px;
  padding-bottom: 0;
}

.card-header {
  font-weight: 600;
  color: #404040;
  font-size: 22px;
  margin-bottom: 15px;
}


</style>
  