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
                <input class="form-input" type="text" placeholder="0.00" required v-model="form.value">
            </div>
            <div class="form-group">
                <label class="form-label">Data</label>
                <input class="form-input" type="date" required v-model="form.date">
            </div>
            <div class="form-group">
                <label class="form-label">Conta</label>
                <input class="form-input" type="text" required v-model="form.account">
            </div>
            <div class="form-group">
                <label class="form-label">Categoria</label>
                <input class="form-input" type="text" v-model="form.category">
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
import { AccountSummaryDTO, Category } from '../config/types';
import { useUserStore } from '../stores/store';

const store =  useUserStore()

const accounts = ref<AccountSummaryDTO[]>([])

async function getMyAccounts(): Promise<AccountSummaryDTO[]> {
    console.log('get my accounts')
  return api.guiabolsoApi({
    method: 'get',
    url: `/accounts-fetch?id=${store.userId}`,
  }).then(function (response) {
    console.log(response.data)
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
      console.log(response.data)
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
    description: 'testando',
    value: 50.78,
    date: (new Date()).toISOString().split('T')[0],
    account: 'sadsad',
    category: 'sdasd',
    comment: '#paz',
})


function handleSubmit(e: any) {
    console.log(e)
    console.log(form.value)
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