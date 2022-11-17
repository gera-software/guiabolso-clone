<template>
  <AppBar>
    <select class="app-bar-select" v-model="store.monthFilter">
      <option v-for="option in store.monthOptions" :value="option.value">
          {{ option.text }}
      </option>
    </select>
  </AppBar>

    <div class="container">
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
import { TransactionSummaryDTO } from "../config/types";
import { useUserStore } from "../stores/store";
import AppBar from '@/components/AppBar.vue'
import FAB from "@/components/FAB.vue";
import { useRouter } from 'vue-router';

const router = useRouter()


const store =  useUserStore()

store.$subscribe(async (mutation, state) => {
  console.log('changed state', state.monthFilter)
  const [ month, year ] = state.monthFilter.split('-')
  const id = state.userId;
  await getTransactions(id, year, month)
})


const transactions = ref<TransactionSummaryDTO[]>([])

async function getTransactions(userId: String, year: String, month: String) {
  transactions.value = await api.guiabolsoApi({
    method: 'get',
    url: `/transactions-fetch-by-user?id=${userId}&month=${month}&year=${year}`,
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
  console.log('changed state', store.monthFilter)
  const [ month, year ] = store.monthFilter.split('-')
  const id = store.userId;
  await getTransactions(id, year, month)
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
    margin-bottom: 80px;
}

</style>
