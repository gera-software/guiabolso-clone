<template>
  <div class="app-bar">
    <router-link to="/" class="icon">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </router-link>
    <h1>Contas e Cartões</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed  } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'
import { groupBy } from 'lodash'


</script>
  
<style scoped>
.app-bar {
  background-color: white;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
}

.app-bar .icon {
  color: #F9386A;
}

.app-bar h1 {
  margin: 0;
  font-weight: 600;
  font-size: 22px;
  color: #404040;
  margin-left: 40px;
}


</style>
  