<template>
  <div class="app-bar">
    <router-link to="/" class="icon">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </router-link>
    <select v-model="selectedMonth">
      <option v-for="option in monthOptions" :value="option.value">{{option.text}}</option>
    </select>
  </div>
  <div class="container">

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed  } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'
import { groupBy } from 'lodash'

const selectedMonth = ref('11/2022')

const monthOptions = ref([
  { text: 'Janeiro/23', value: '01/2023' },
  { text: 'Dezembro/22', value: '12/2022' },
  { text: 'Novembro/22', value: '11/2022' },
  { text: 'Outubro/22', value: '10/2022' },
  { text: 'Setembro/22', value: '09/2022' }
])

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
  color: #F9386A;
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
  