<template>
    <input v-model="monthFilter" type="month">

    <!-- <pre>
      {{ transactionsGroupedByDate }}
    </pre> -->
    <div class="date-group" v-for="(transactions, dateString) in transactionsGroupedByDate" :key="dateString">
      <h2>{{ new Date(dateString).toLocaleDateString() }}</h2>
      <div class="transaction" v-for="transaction in transactions" :key="transaction._id">
        <div class="col-1">
          <span class="category">{{ transaction.category[0].name }}</span>
          <span class="description">{{ transaction.description }}</span> 
        </div>
        <div class="col-2">
          <span class="account">{{ transaction.account[0].name }}</span>
          <span class="value">R$ {{ transaction.value }}</span>
        </div>
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref, watch, computed  } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'
import { groupBy } from 'lodash'

interface Account {
  _id: String,
  name: String,
}

interface Category {
  _id: String,
  name: String,
}

interface Transaction {
  _id: string;
  account: Array<Account>;
  accountId: String;
  category: Array<Category>;
  categoryId: String;
  comment: String;
  date: String;
  description: String;
  value: Number;
}

const monthFilter = ref('')

watch(monthFilter, async () => {
    const [ year, month ] = monthFilter.value.split('-')
    console.log(year, month)

    await getTransactions(year, month)

})

const transactions = ref<Array<Transaction>>([])

async function getTransactions(year: String, month: String) {
    console.log(year, month)
  return api.guiabolsoApi({
    method: 'get',
    url: `/get-transactions?year=${year}&month=${month}`,
  }).then(function (response) {
    // console.log(response.data)
    transactions.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  monthFilter.value = `${year}-${month.toString().padStart(2, '0')}`

})

const transactionsGroupedByDate = computed(() => {
      // return transactions.value;
      return groupBy(transactions.value, (transaction) => transaction.date )
});

</script>
  
<style scoped>
  .date-group {
    border-bottom: 1px solid black;
    padding: 15px 0;
  }

  .date-group h2 {
    margin: 0;
    padding-left: 15px;
  }

  .transaction {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .col-1 {
    display: flex;
    flex-direction: column;
  }

  .col-2 {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .category {
    opacity: .7;
  }

  .description {
    font-size: 1.2em;
  }

  .account {
    opacity: .7;
  }

  .value {
    font-size: 1.2em;
    font-weight: bold;
  }
</style>
  