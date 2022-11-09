<template>
    <HelloWorld msg="Home view" />
    <button @click="getNubank">get nubank</button>
    <pre>
        {{ nubank }}
    </pre>
    <button @click="listNubankAccounts">list nubank accounts</button>
    <pre>
        {{ accounts }}
    </pre>
    <input type="text" placeholder="nubank account id" v-model="selectedAccount"/> {{selectedAccount}}
    <button @click="listTransactions">listTransactions</button>
    <pre>
        {{ transactions }}
    </pre>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import { ref } from 'vue';

const nubank = ref({})

async function getNubank() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-get-item`,
        });
    // console.log(response.data)
        nubank.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const accounts = ref({})

async function listNubankAccounts() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-list-accounts`,
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
  