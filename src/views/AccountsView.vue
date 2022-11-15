<template>
  <div class="app-bar">
    <router-link to="/" class="icon">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </router-link>
    <h1>Contas e Cartões</h1>
  </div>
  <div class="container">

    <div class="card">
      <div class="card-header">Contas bancárias</div>
      <div class="account" v-for="account in accountsGroupedByType.BANK" :key="account._id?.toString()">
        <img class="account-logo" :title="account.bankData?.institution.name.toString()" :src="account.bankData?.institution.imageUrl?.toString()" />
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
      <div class="account" v-for="account in accountsGroupedByType.CREDIT_CARD" :key="account._id?.toString()">
        <img class="account-logo" :title="account.creditData?.institution.name.toString()" :src="account.creditData?.institution.imageUrl?.toString()" />
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
      <div class="account" v-for="account in accountsGroupedByType.WALLET" :key="account._id?.toString()">
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

interface Institution {
    _id?: String,
    pluggyConnectorId?: Number,
    name: String,
    imageUrl?: String,
    primaryColor?: String,
}

enum AccountSyncType {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
} 

enum AccountType {
    WALLET = 'WALLET',
    BANK = 'BANK',
    CREDIT_CARD = 'CREDIT_CARD'
}

enum CurrencyCodes {
    BRL = 'BRL',
}

interface AccountOwner {
    name: String,
    pluggyIdentityId?: String,
    cpf?: String,
}

enum ConnectionStatus {
    UPDATING = 'UPDATING',
    LOGIN_ERROR = 'LOGIN_ERROR',
    OUTDATED = 'OUTDATED',
    WAITING_USER_INPUT = 'WAITING_USER_INPUT',
    UPDATED = 'UPDATED',
}

interface Connection {
    pluggyItemId: String,
    lastUpdatedAt: Date,
    status: ConnectionStatus,
}

interface BankData {
    institution: Institution,
} 

interface CreditData {
    institution: Institution,
    brand: String,
    creditLimit: Number,
    availableCreditLimit: Number,
    closeDate: Date,
    dueDate: Date,
}

interface Account {
    _id?: String,
    name: String,
    syncType: AccountSyncType,
    pluggyAccountId?: String,
    balance: Number,
    currencyCode: CurrencyCodes,
    type: AccountType,
    userId: String,
    accountOwner?: AccountOwner,
    connection?: Connection,
    bankData?: BankData,
    creditData?: CreditData,
}

const accounts = ref<Account[]>([])

const accountsGroupedByType = computed(() => {
  return groupBy(accounts.value, (accounts) => accounts.type )
});

async function getMyAccounts(): Promise<Account[]> {
    console.log('get my accounts')
  return api.guiabolsoApi({
    method: 'get',
    url: `/accounts-fetch`,
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
  