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
            <div
                class="date-group"
                v-for="day in days"
                :key="day"
            >
                <h2>{{ day }}</h2>
                <div
                    class="transaction"
                    v-for="transaction in listTransactions(day)"
                    :key="transaction._id?.toString()"
                >
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

const days = computed(() => {
      // return transactions.value;
      const pairs = toPairs( groupBy(transactions.value, (transaction) => (new Date(transaction.date)).getDate() ) )
      const sort = orderBy(pairs, [function(o){return +o[0]}], ['desc'])
      return sort.map((kvArray) => kvArray[0])
      // .sortBy((kvArray) => kvArray[0])
      // .map((kvArray) => kvArray[1])
      // .value()
});

const transactionsGroupedByDate = computed(() => {
      // return transactions.value;
      const pairs = toPairs( groupBy(transactions.value, (transaction) => (new Date(transaction.date)).getDate() ) )
      const sort = orderBy(pairs, [function(o){return +o[0]}], ['desc'])
      return sort
      // .sortBy((kvArray) => kvArray[0])
      // .map((kvArray) => kvArray[1])
      // .value()
});

function listTransactions(day: String) {
  const group = transactionsGroupedByDate.value.find(group => group[0] === day) ?? []
  return group[1] ?? []
}



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
  return api.guiabolsoApi({
    method: 'get',
    url: `/transactions-fetch-by-user?id=${userId}&month=${month}&year=${year}`,
  }).then(function (response) {
    console.log(response.data)
    transactions.value = response.data
    return response.data
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



/**
Date Group
*/

.date-group {
    border-bottom: 1px solid #AAAAAA;
    padding: 15px 0;
  }

  .date-group h2 {
    margin: 0;
    padding-left: 15px;
    font-size: 1.2em;
    color: #AAAAAA;
  }

  .date-group .transaction {
    display: flex;
    justify-content: space-between;
    padding: 15px;
  }

  .date-group .col-1 {
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    flex-basis: min-content;
    overflow: hidden;
  }

  .date-group .col-2 {
    display: flex;
    flex-direction: column;
    text-align: right;
    flex-shrink: 0;
  }

.date-group .flex {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    flex-basis: min-content;
    overflow: hidden;
  }

  .date-group  .category {
    font-size: .8em;
    opacity: .7;
    white-space: nowrap;
  }

  .date-group .description {
    font-size: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .date-group  .account {
    font-size: .8em;
    opacity: .7;
  }

  .date-group  .value {
    font-size: 1em;
    font-weight: bold;
  }
</style>
