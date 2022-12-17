<template>
    <AppBar title="Conexão de conta" />
    <div class="container">
        <ul class="institutions-list">
            <li v-for="institution in institutions" :key="institution._id?.toString()">
                <img class="institution-logo" :src="institution.imageUrl?.toString()" />

                {{institution.name}}
                {{institution.type}}
                {{institution.pluggyConnectorId}}
            </li>
        </ul>

        Não encontrou seu banco?
        Quer registrar gastos manualmente?
        Conta manual
    </div>
</template>

<script setup lang="ts">
import api from '../config/axios.js'
import AppBar from '@/components/AppBar.vue'
import { Institution } from '../config/types';
import { ref, onMounted } from 'vue';

const institutions = ref<Institution[]>([])

async function getAvailableConnectors(): Promise<Institution[]> {
    console.log('get institutions')
  return api.guiabolsoApi({
    method: 'get',
    url: `/pluggy-available-connectors`,
  }).then(function (response) {
      institutions.value = response.data
      console.log(institutions.value)
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
    await getAvailableConnectors()
})
</script>

<style scoped>
.container {
  padding-top: 60px;
}

.institutions-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.institutions-list li {
    padding: 15px;
}

.institutions-list .institution-logo {
    border: 1px solid #F2F2F2;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
}
</style>