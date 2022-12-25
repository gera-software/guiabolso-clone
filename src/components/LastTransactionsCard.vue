<template>
    <div class="card">
        <div class="card-header">
            <h2>Últimas transações</h2> 
            <router-link :to="{ name: 'extract'}">
              <font-awesome-icon icon="fa-solid fa-arrow-right-long" />
            </router-link>
          </div>
        <div class="card-body">
          <span v-if="(transactions.length == 0)">Ainda não há transações</span>
          <TransactionSummary v-for="(transaction, index) in transactions" :transaction="transaction" :showDate="true"></TransactionSummary>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/store';
import api from "../config/axios.js";
import TransactionSummary from '@/components/TransactionSummary.vue'
import { Category, CurrencyCodes, TransactionStatus, TransactionSummaryDTO, TransactionType, AccountData, AccountType } from '../config/types';

const store =  useUserStore()

store.$subscribe(async (mutation, state) => {
  console.log('changed state', state.monthFilter)
  const [ month, year ] = state.monthFilter.split('-')
  const id = state.user._id;
  await getTransactions(id, year, month)
})

const transactions = ref<TransactionSummaryDTO[]>([])

async function getTransactions(userId: String, year: String, month: String) {
  transactions.value = await api.guiabolsoApi({
    method: 'get',
    url: `/transactions-fetch-by-user?id=${userId}&month=${month}&year=${year}&limit=4`,
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
  const id = store.user._id;
  await getTransactions(id, year, month)
})

</script>

<style scoped>

.card {
  background-color: white;
  margin: 30px 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                       0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                       0px 2px 1px -1px rgba(0, 0, 0, 0.12);

}

.card-header {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header h2 {
  font-weight: 600;
  color: #404040;
  font-size: 22px;
  margin: 0;
}
.card-header a {
  color: #F9386A;
}

</style>
