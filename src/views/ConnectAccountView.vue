<template>
    <div class="page">
        <AppBar title="Conexão de conta" />
        <div class="container">
            <p>
                Escolha uma instituição para conectar
            </p>
            <ul class="institutions-list">
                <li v-for="institution in institutions" :key="institution._id?.toString()">
                    <div class="institution breve">
                        <img class="institution-logo" :src="institution.imageUrl?.toString()" />
                        <div>
                            {{institution.name}}
                        </div>
                    </div>
                </li>
            </ul>
    
            <p>
                Não encontrou seu banco ou quer registrar gastos manualmente?
            </p>
            <router-link class="institution" :to="{ name: 'accounts-connect-manual'}">
                <img class="institution-logo" src="@/assets/ManualAccountIcon.svg" />
                <div>
                    Conta manual
                </div>
            </router-link>
        </div>
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
  margin: 0 15px;
  padding-bottom: 40px;
}

.institutions-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.institutions-list li {
    padding: 15px 0;
}

.institution {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #111111;
    text-decoration: none;
}

.institution .institution-logo {
    border: 1px solid #F2F2F2;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
}

.institution.breve {
    color: #11111167;
}
.institution.breve .institution-logo {
    opacity: .5;
}

.institution.breve::after {
    content: 'em breve';
    background-color: #FFC969;
    color: white;
    border-radius: 8px;
    padding: 2px 7px;
    text-transform: uppercase;
    font-size: .6em;
    font-weight: 600;
    margin-left: 10px;
}
 </style>