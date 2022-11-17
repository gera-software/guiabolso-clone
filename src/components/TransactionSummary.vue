<template>
    <div class="transaction" :class="{ 'transaction--ignored': transaction.ignored }">
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
</template>
<script setup lang="ts">
import CategoryIcon from '@/components/CategoryIcon.vue'
import { TransactionSummaryDTO } from '../config/types';

defineProps<{
    transaction: TransactionSummaryDTO
}>()

</script>
<style scoped>

.transaction {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
}

.transaction--ignored {
    opacity: .35;
}

.transaction .col-1 {
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    flex-basis: min-content;
    overflow: hidden;
  }

.transaction .col-2 {
    display: flex;
    flex-direction: column;
    text-align: right;
    flex-shrink: 0;
  }

.transaction .flex {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    flex-basis: min-content;
    overflow: hidden;
  }

.transaction .category {
    font-size: .8em;
    color: #454545;
    white-space: nowrap;
  }

.transaction .description {
    font-size: 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #222222;
  }

.transaction .account {
    font-size: .8em;
    color: #454545;
  }

.transaction .value {
    font-size: 1em;
    font-weight: bold;
    color: #222222;
}
</style>