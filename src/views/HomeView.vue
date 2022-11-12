<template>
    <h1>Pluggy API Playground</h1>
    <input type="text" placeholder="connection id" v-model="selectedConnection"/> {{selectedConnection}}
    <button @click="getConnection">get connection</button>
    <pre>
        {{ connection }}
    </pre>
    <input type="text" placeholder="connection id" v-model="selectedConnection"/> {{selectedConnection}}
    <button @click="listAccounts">list accounts by connection</button>
    <pre>
        {{ accounts }}
    </pre>
    <input type="text" placeholder="account id" v-model="selectedAccount"/> {{selectedAccount}}
    <button @click="listTransactions">list Transactions by account</button>
    <pre>
        {{ transactions }}
    </pre>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import { ref } from 'vue';

const connection = ref({})

async function getConnection() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-get-item?itemId=${selectedConnection.value}`,
        });
    // console.log(response.data)
        connection.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const selectedConnection = ref('')
const accounts = ref({})

async function listAccounts() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-list-accounts?itemId=${selectedConnection.value}`,
        });
        // console.log(response.data)
        accounts.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const selectedAccount = ref('')
const transactions = ref({})

async function listTransactions() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-list-transactions?accountId=${selectedAccount.value}`,
        });
        // console.log(response.data)
        transactions.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

</script>
  
<style scoped>
  
</style>
  