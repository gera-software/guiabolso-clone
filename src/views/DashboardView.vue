<template>
    <AppBar>
        <select class="app-bar-select" v-model="store.monthFilter">
        <option v-for="option in store.monthOptions" :value="option.value">
            {{ option.text }}
        </option>
        </select>
    </AppBar>
    <div class="container">
        <HighestMonthlySpendingCard></HighestMonthlySpendingCard>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/store';
import AppBar from '@/components/AppBar.vue'
import HighestMonthlySpendingCard from '@/components/HighestMonthlySpendingCard.vue'

const store =  useUserStore()

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
    padding-bottom: 80px;
}

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

.donut {
    display: flex;
    gap: 10px;
}

.donut-chart path {
    transform-origin: center;
}

.donut-legend {
    list-style-type: none;
    margin: 0;
    padding: 0;
    max-width: 40%;
}

.donut-legend li {
    padding: 10px 0;
    display: flex;
    gap: 10px;
    align-items: center;
}

.donut-legend .label {
    font-size: .8em;
    color: #454545;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.donut-legend .color {
    width: 1em;
    height: 1em;
    background-color: #D9D9D9;
    border-radius: 100%;
    flex-shrink: 0;
}


</style>
