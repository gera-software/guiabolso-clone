<template>
    <div class="card">
        <div class="card-header">
            <h2>Últimas transações</h2> 
          </div>
        <div class="card-body">
          <TransactionSummary :transaction="transaction" :showDate="true"></TransactionSummary>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/store';
import api from "../config/axios.js";
import TransactionSummary from '@/components/TransactionSummary.vue'
import { Category, CurrencyCodes, TransactionStatus, TransactionSummaryDTO, TransactionType, AccountData, AccountType } from '../config/types';

const transaction = ref<TransactionSummaryDTO>({
  _id: 'dad',
  description: 'sdsdfsdf',
  descriptionOriginal: 'dffsdf',
  amount: 5000,
  currencyCode: CurrencyCodes.BRL,
  date: new Date(),
  category: {
    _id: 'asd',
    name: 'outra categoria',
    iconName: 'ICON',
    primaryColor: 'dada',
    ignored: false,
  } as Category,
    type: TransactionType.EXPENSE,
    status: TransactionStatus.POSTED,
    ignored: false,
    account: {
      _id: 'sad',
      name: 'gimar 4354',
      type: AccountType.BANK,
      imageUrl: 'dad'
    } as AccountData
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
}
.card-header h2 {
  font-weight: 600;
  color: #404040;
  font-size: 22px;
  margin: 0;
}

</style>
