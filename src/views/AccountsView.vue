<template>
  <AppBar title="Contas e Cartões" />
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
import AccountSummary from '@/components/AccountSummary.vue';
import AppBar from '@/components/AppBar.vue'


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


.container {
  padding-top: 60px;
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
  