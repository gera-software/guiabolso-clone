<template>
  <AppBar>
    <select class="app-bar-select" v-model="store.monthFilter">
      <option v-for="option in store.monthOptions" :value="option.value">
          {{ option.text }}
      </option>
    </select>
  </AppBar>

    <div class="container">
      <div class="account-info" v-if="account">
        <img class="account-logo" :src="account.imageUrl?.toString()" />
        <div>
          <h2 class="title">{{account.bankData?.institution.name}}{{account.creditData?.institution.name}}</h2>
          <h3 class="subtitle">{{account.name}}</h3>
        </div>
      </div>
      <TransactionList :transactions="transactions" />
    </div>
    <FAB @click="handleClick">
      <font-awesome-icon icon="fa-solid fa-plus" />
    </FAB>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import api from "../config/axios.js";
import { onMounted } from "vue";
import TransactionList from "../components/TransactionList.vue";
import { AccountDTO, TransactionSummaryDTO } from "../config/types";
import { useUserStore } from "../stores/store";
import { useRoute } from "vue-router";
import AppBar from '@/components/AppBar.vue'
import FAB from "@/components/FAB.vue";
import { useRouter } from 'vue-router';

const router = useRouter()


const route = useRoute()

const store =  useUserStore()

store.$subscribe(async (mutation, state) => {
  console.log('changed state', state.monthFilter)
  const [ month, year ] = state.monthFilter.split('-')
  const id = route.params.id.toString()
  await getTransactionsByAccount(id, year, month)
})


const transactions = ref<TransactionSummaryDTO[]>([])

async function getTransactionsByAccount(accountId: String, year: String, month: String) {
  transactions.value = await api.guiabolsoApi({
    method: 'get',
    url: `/transactions-fetch-by-account?id=${accountId}&month=${month}&year=${year}`,
  }).then(function (response) {
    console.log(response.data)
    return response.data
  }).then(transactions => {
    return transactions.map((transaction : TransactionSummaryDTO): TransactionSummaryDTO => { 
      transaction.date = new Date(transaction.date) 
      return transaction 
    })
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  console.log('month filter', store.monthFilter)
  const [ month, year ] = store.monthFilter.split('-')
  const id = route.params.id.toString()
  await getTransactionsByAccount(id, year, month)
})


const account = ref<AccountDTO>()

async function getAccount(accountId: String) {
  account.value = await api.guiabolsoApi({
    method: 'get',
    url: `/account-get?id=${accountId}`
  }).then((response) => {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}


onMounted(async () => {
  console.log("accountid", route.params.id)
  const id = route.params.id;
  await getAccount(id.toString())
})

function handleClick() {
    router.push({ name: 'add-transaction' })
}

</script>

<style scoped>

.app-bar-select {
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    color: #404040;
    border: none;
    background-color: white;
}

.container {
    padding-top: 60px;
    padding-bottom: 80px;

}


.account-info {
  padding: 20px 15px 0 15px;
  display: flex;
  align-items: center;
}

.account-info .account-logo {
  border: 1px solid #F2F2F2;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}

.account-info .title {
  margin: 0;
  font-family: 'Open Sans';
  font-size: 14px;
  font-weight: 600;
  color: #222222;
}

.account-info .subtitle {
  margin: 0;
  font-family: 'Open Sans';
  font-size: 12px;
  text-transform: uppercase;
  font-weight: normal;
  color: #454545;
}

</style>
