<template>
    <AppBar title="Nova transação manual" />
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label class="form-label">Nome da Transação</label>
                <input class="form-input" type="text" placeholder="Crie um nome para a transação" required v-model="form.description">
            </div>
            <div class="form-group">
                <label class="form-label">Valor</label>
                <CurrencyInput class="form-input" required v-model="form.ammount" />
            </div>
            <div class="form-group">
                <label class="form-label">Data</label>
                <input class="form-input" type="date" required v-model="form.date">
            </div>
            <div class="form-group">
                <label class="form-label">Conta</label>
                <select class="form-input" required v-model="form.accountId">
                    <option v-for="account in accounts" :value="account._id">{{account.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Categoria</label>
                <select class="form-input" required v-model="form.categoryId">
                    <option v-for="category in categories" :value="category._id">{{category.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Comentários e #tags</label>
                <input class="form-input" type="text" placeholder="Escreva seus comentários e #tags" v-model="form.comment">
            </div>
            <div class="form-group">
                <button type="submit" class="button">Salvar</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import api from '../config/axios.js'
import { ref, watch, computed  } from 'vue'
import AppBar from '@/components/AppBar.vue'
import { onMounted } from 'vue';
import { AccountSummaryDTO, Category, CurrencyCodes, Transaction, TransactionStatus, TransactionType } from '../config/types';
import { useUserStore } from '../stores/store';
import CurrencyInput from '../components/CurrencyInput.vue'

const store =  useUserStore()

const accounts = ref<AccountSummaryDTO[]>([])

async function getMyAccounts(): Promise<AccountSummaryDTO[]> {
    console.log('get my accounts')
  return api.guiabolsoApi({
    method: 'get',
    url: `/accounts-fetch?id=${store.userId}`,
  }).then(function (response) {
    // console.log(response.data)
    accounts.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  getMyAccounts()
})

const categories = ref<Category[]>([])

async function getCategories(): Promise<Category[]> {
    console.log('get categories')
  return api.guiabolsoApi({
    method: 'get',
    url: `/categories-fetch`,
  }).then(function (response) {
    //   console.log(response.data)
      categories.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
    getCategories()
})


const form = ref({
    description: '',
    ammount: 0, // multiplied by 100 to remove decimals
    date: dateToString(new Date()),
    accountId: '',
    categoryId: '',
    comment: '',
})

function dateToString(date: Date) : string {
  return date.toISOString().split('T')[0]
}

function stringToDate(dateString: string): Date {
    // const date = new Date(dateString)
    // const start = date.toISOString().split('T')[0]
    // const end = (new Date()).toISOString().split('T')[1]
    // const isoDateString = start + 'T' + end
    // return new Date(isoDateString)

    const date = new Date()
    const [ year, month, day ] = dateString.split('-')
    date.setFullYear(+year, +month - 1, +day)
    return date
}


async function handleSubmit() {
    const payload: Transaction = {
        description: form.value.description,
        amount: form.value.ammount,
        currencyCode: CurrencyCodes.BRL,
        date: stringToDate(form.value.date),
        category: categories.value.find(category => category._id === form.value.categoryId),
        type: form.value.ammount >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE,
        status: TransactionStatus.POSTED,
        comment: form.value.comment,
        ignored: false,
        accountId: form.value.accountId,
        userId: store.userId,
        _isDeleted: false,
    }

    await saveTransaction(payload)

}

async function saveTransaction(payload: Transaction): Promise<Transaction> {
    console.log('save transaction')
  return api.guiabolsoApi({
    method: 'post',
    url: `/transaction-create`,
    data: payload,
  }).then(function (response) {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}
</script>

<style scoped>

.container {
  margin-top: 60px;
}


.form-group {
    /* background-color: blue; */
    padding: 18px 15px;
    display: flex;
    flex-direction: column;
}

.form-group .form-label {
    /* background-color: green; */
    font-family: 'Open Sans';
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    color: #404040;
    margin-bottom: 16px;

}

.form-group .form-input {
    /* background-color: blueviolet; */
    font-family: 'Open Sans';
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    color: #404040;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 8px 0;
    width: 100%;
}

.button {
    background-color: #F9386A;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: 'Open Sans';
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 12px 16px;
}

.button.disabled {
    opacity: .35;
}

</style>