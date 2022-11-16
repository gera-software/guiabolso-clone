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
        <div class="account" v-for="account in accountsGroupedByType.BANK" :key="account._id?.toString()" @click="goToExtract(account._id?.toString())">
          <img class="account-logo" :title="account.bankData?.institution.name.toString()" :src="account.imageUrl?.toString()" />
          <div>
            <div class="name">{{account.name}}</div>
            <div class="balance">R$ {{ (+account.balance / 100).toFixed(2) }}</div>
            <div class="date" v-if="account.syncType === 'AUTOMATIC'"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Atualizado em {{ (new Date(""+account.connection?.lastUpdatedAt)).toLocaleString() }}</div>
            <div class="date" v-else><font-awesome-icon icon="fa-solid fa-user" /> Conta manual</div>
          </div>
        </div>
    </div> 

    <div class="card">
      <div class="card-header">Cartões de Crédito</div>
      <div class="account" v-for="account in accountsGroupedByType.CREDIT_CARD" :key="account._id?.toString()" @click="goToExtract(account._id?.toString())">
        <img class="account-logo" :title="account.creditData?.institution.name.toString()" :src="account.imageUrl?.toString()" />
        <div>
          <div class="name">{{account.name}}</div>
          <div class="balance">R$ {{ (+account.balance / 100).toFixed(2) }}</div>
          <div class="date" v-if="account.syncType === 'AUTOMATIC'"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Atualizado em {{ (new Date(""+account.connection?.lastUpdatedAt)).toLocaleString() }}</div>
          <div class="date" v-else><font-awesome-icon icon="fa-solid fa-user" /> Conta manual</div>
        </div>
      </div>
    </div> 

    <div class="card">
      <div class="card-header">Carteiras</div>
      <div class="account" v-for="account in accountsGroupedByType.WALLET" :key="account._id?.toString()" @click="goToExtract(account._id?.toString())">
        <div class="account-logo account-logo--wallet"><font-awesome-icon icon="fa-solid fa-wallet" /></div>
        <div>
          <div class="name">{{account.name}}</div>
          <div class="balance">R$ {{ (+account.balance / 100).toFixed(2) }}</div>
          <div class="date" v-if="account.syncType === 'AUTOMATIC'"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Atualizado em {{ (new Date(""+account.connection?.lastUpdatedAt)).toLocaleString() }}</div>
          <div class="date" v-else><font-awesome-icon icon="fa-solid fa-user" /> Conta manual</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed  } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'
import { groupBy } from 'lodash'
import { AccountDTO } from '../config/types';
import { useUserStore } from '../stores/store';
import { useRouter } from 'vue-router';

const router = useRouter()

const store =  useUserStore()

const accounts = ref<AccountDTO[]>([])

const accountsGroupedByType = computed(() => {
  return groupBy(accounts.value, (accounts) => accounts.type )
});

async function getMyAccounts(): Promise<AccountDTO[]> {
    console.log('get my accounts')
  return api.guiabolsoApi({
    method: 'get',
    url: `/accounts-fetch?id=${store.userId}`,
  }).then(function (response) {
    // console.log(response.data)
    accounts.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  getMyAccounts()
})

function goToExtract(accountId: String | undefined) {
  router.push({
    name: 'extract-by-account',
    params: {
      id: accountId?.toString()
    }
  })
}

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

.account {
  /* background-color: #F9386A; */
  border-bottom: 1px solid #F2F2F2;
  padding: 15px 0px;
  display: flex;
}

.account:last-child {
  border-bottom: none;
}

.account-logo {
  border: 1px solid #F2F2F2;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}

.account-logo.account-logo--wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #F9386A;
  background-color: #FFF5F8;
}

.account .name {
  font-size: 12px;
  font-weight: 400;
  color: #404040;
  text-transform: uppercase;
}
.account .date {
  font-size: 12px;
  font-weight: 400;
  color: #404040;
}

.account .balance {
  font-family: 'Axiforma';
  font-size: 30px;
  font-weight: 800;
  color: #404040;
}

</style>
  