<template>
    <div class="app-bar">
      <a @click="router.back()" class="icon">
        <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
      </a>
        <select v-model="store.monthFilter">
            <option v-for="option in store.monthOptions" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
    <div class="container">
      <TransactionList :transactions="transactions" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import api from "../config/axios.js";
import { onMounted } from "vue";
import TransactionList from "../components/TransactionList.vue";
import { TransactionSummaryDTO } from "../config/types";
import { useUserStore } from "../stores/store";
import { useRouter } from "vue-router";

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
    color: #f9386a;
}

.app-bar select {
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    color: #404040;
    margin-left: 40px;
    border: none;
    background-color: white;
}

.container {
    margin-top: 60px;
}

</style>
