<template>
    <div class="app-bar">
        <router-link to="/" class="icon">
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
        </router-link>
        <select v-model="selectedMonth">
            <option v-for="option in monthOptions" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
    <div class="container">
      <div class="transactions-container">
        <div v-for="(transaction, index) in transactions">
          <div class="date-separator" v-if="index === 0 || transactions[index - 1].date.getDate() !== transaction.date.getDate()">
            <div class="date">
              <h2 class="day">{{ transaction.date.toLocaleString('pt-BR', { day: '2-digit'}) }}</h2>
              <div class="month">{{ transaction.date.toLocaleString('pt-BR', { month: 'short'}) }}</div>
            </div>
          </div>

          <div class="transaction">
              <div class="col-1">
                  <CategoryIcon :icon="transaction.category?.iconName" :color="transaction.category?.primaryColor" />
                  <div class="flex">
                      <span class="category">{{
                          transaction.category?.name
                      }}</span>
                      <span class="description">{{
                          transaction.description
                      }}</span>
                  </div>
              </div>
              <div class="col-2">
                  <span class="account">{{
                      transaction.account.name
                  }}</span>
                  <span class="value">R$ {{ (+transaction.amount / 100).toFixed(2) }}</span>
              </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import api from "../config/axios.js";
import { onMounted } from "vue";
import { groupBy, sortBy, toPairs, orderBy } from "lodash";
import { useRoute } from "vue-router";
import CategoryIcon from '@/components/CategoryIcon.vue'


const route = useRoute()

const selectedMonth = ref("");

const monthOptions = ref([
    { text: "Janeiro/23", value: "01-2023" },
    { text: "Dezembro/22", value: "12-2022" },
    { text: "Novembro/22", value: "11-2022" },
    { text: "Outubro/22", value: "10-2022" },
    { text: "Setembro/22", value: "09-2022" },
]);

onMounted(async () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  selectedMonth.value = `${month.toString().padStart(2, '0')}-${year}`
})

watch(selectedMonth, async () => {
  const [ month, year ] = selectedMonth.value.split('-')
  const id = route.query.id?.toString() ?? ''
  console.log(id, month, year)

  await getTransactions(id, year, month)

})

interface Category {
    _id?: String,
    name: String,
    iconName: String,
    primaryColor: String
}

enum CurrencyCodes {
    BRL = 'BRL',
}

enum TransactionType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
}

enum TransactionStatus {
    PENDING = 'PENDING',
    POSTED = 'POSTED',
}

enum AccountType {
    WALLET = 'WALLET',
    BANK = 'BANK',
    CREDIT_CARD = 'CREDIT_CARD'
}

interface AccountSummary {
  _id?: String,
  name: String,
  type: AccountType,
  imageUrl?: String,
}

interface TransactionSummary {
    _id?: String,
    description: String,
    amount: Number,
    currencyCode: CurrencyCodes,
    date: Date,
    category?: Category,
    type: TransactionType,
    status: TransactionStatus,
    ignored: Boolean,
    account: AccountSummary
}

const transactions = ref<TransactionSummary[]>([])

async function getTransactions(userId: String, year: String, month: String) {
  transactions.value = await api.guiabolsoApi({
    method: 'get',
    url: `/transactions-fetch-by-user?id=${userId}&month=${month}&year=${year}`,
  }).then(function (response) {
    console.log(response.data)
    return response.data
  }).then(transactions => {
    return transactions.map((transaction : TransactionSummary): TransactionSummary => { 
      transaction.date = new Date(transaction.date) 
      return transaction 
    })
  }).catch(function (error) {
    console.log(error.response?.data);
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

.transactions-container {
  padding: 15px;
}

/**
Transaction
*/

.transactions-container .date-separator {
  padding: 15px 0;
  position: relative;
}

.transactions-container .date-separator::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  left: 50px;
  height: 1px;
  background-color: #AAAAAA;
}


.transactions-container .date-separator .date {
  text-align: center;
  padding-right: 15px;
  max-width: 60px;
}

.transactions-container .date-separator .day {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #AAAAAA;
}
.transactions-container .date-separator .month {
    margin: 0;
    font-size: 12px;
    font-weight: 400;
    color: #AAAAAA;
    text-transform: uppercase;
}

.transactions-container .transaction {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
}

.transactions-container .transaction .col-1 {
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    flex-basis: min-content;
    overflow: hidden;
  }

.transactions-container .transaction .col-2 {
    display: flex;
    flex-direction: column;
    text-align: right;
    flex-shrink: 0;
  }

  .transactions-container .transaction .flex {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex-basis: min-content;
    overflow: hidden;
  }

  .transactions-container .transaction .category {
    font-size: .8em;
    color: #454545;
    white-space: nowrap;
  }

  .transactions-container .transaction .description {
    font-size: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #222222;
  }

  .transactions-container .transaction .account {
    font-size: .8em;
    color: #454545;
  }

  .transactions-container .transaction .value {
    font-size: 1em;
    font-weight: bold;
    color: #222222;
  }
</style>
