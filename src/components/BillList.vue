<template>
    <div class="bills-container">
      
      <div v-for="(bill, index) in bills">
        <div class="date-separator" v-if="index === 0 || bills[index - 1].dueDate.getDate() !== bill.dueDate.getDate()">
          <div class="date">
            <h2 class="day">{{ bill.dueDate.toLocaleString('pt-BR', { day: '2-digit'}) }}</h2>
            <div class="month">{{ bill.dueDate.toLocaleString('pt-BR', { month: 'short'}) }}</div>
          </div>
        </div>
        <CalendarSummary :bill="bill"></CalendarSummary>
      </div>
      <div v-if="bills.length == 0">Ainda não há contas na agenda</div>

    </div>
</template>
<script setup lang="ts">
import { CalendarBill } from "../config/types";
import CalendarSummary from '@/components/CalendarSummary.vue'


defineProps<{
  bills: CalendarBill[]
}>()
</script>
<style scoped>

.bills-container .date-separator {
padding: 15px 0;
position: relative;
}

.bills-container .date-separator::before {
content: '';
position: absolute;
top: 50%;
right: 0;
left: 50px;
height: 1px;
background-color: #AAAAAA;
}


.bills-container .date-separator .date {
text-align: center;
padding-right: 15px;
max-width: 60px;
}

.bills-container .date-separator .day {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #AAAAAA;
}
.bills-container .date-separator .month {
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #AAAAAA;
  text-transform: uppercase;
}

</style>