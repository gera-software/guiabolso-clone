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
        <!-- <div class="transactions-container">
            <div
                class="date-group"
                v-for="(transactions, dateString) in transactionsGroupedByDate"
                :key="dateString"
            >
                <h2>{{ new Date(dateString).toLocaleDateString() }}</h2>
                <div
                    class="transaction"
                    v-for="transaction in transactions"
                    :key="transaction._id"
                >
                    <div class="col-1">
                        <CategoryIcon icon="UncategorizedIcon" color="red" />
                        <div class="flex">
                            <span class="category">{{
                                transaction.category[0].name
                            }}</span>
                            <span class="description">{{
                                transaction.description
                            }}</span>
                        </div>
                    </div>
                    <div class="col-2">
                        <span class="account">{{
                            transaction.account[0].name
                        }}</span>
                        <span class="value">R$ {{ transaction.value }}</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import api from "../config/axios.js";
import { onMounted } from "vue";
import { groupBy } from "lodash";

const selectedMonth = ref("11-2022");

const monthOptions = ref([
    { text: "Janeiro/23", value: "01-2023" },
    { text: "Dezembro/22", value: "12-2022" },
    { text: "Novembro/22", value: "11-2022" },
    { text: "Outubro/22", value: "10-2022" },
    { text: "Setembro/22", value: "09-2022" },
]);

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

watch(selectedMonth, async () => {
    const [ year, month ] = selectedMonth.value.split('-')
    console.log(year, month)

    // await getTransactions(year, month)

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
}

.container {
    margin-top: 60px;
}
</style>
