<template>
      <div class="transactions-container">
        
        <div v-for="(transaction, index) in transactions">
          <div class="date-separator" v-if="index === 0 || transactions[index - 1].date.getDate() !== transaction.date.getDate()">
            <div class="date">
              <h2 class="day">{{ transaction.date.toLocaleString('pt-BR', { day: '2-digit'}) }}</h2>
              <div class="month">{{ transaction.date.toLocaleString('pt-BR', { month: 'short'}) }}</div>
            </div>
          </div>

          <TransactionSummary :transaction="transaction"></TransactionSummary>
        </div>

      </div>
</template>
<script setup lang="ts">
import TransactionSummary from "../components/TransactionSummary.vue";


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


const props = defineProps<{
    transactions: TransactionSummary[]
}>()
</script>
<style scoped>

.transactions-container {
  padding: 15px;
}

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

</style>