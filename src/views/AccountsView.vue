<template>
  <div class="app-bar">
    <router-link to="/" class="icon">
      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
    </router-link>
    <h1>Contas e Cartões</h1>
  </div>
  <div class="container">
    <div class="card">
      <div class="card-header">Nubank</div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Nubank</div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Nubank</div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Nubank</div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
      <div class="account">
        <div class="name">cartão 5346</div>
        <div class="balance">R$ -3645,88</div>
      </div>
    </div>
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
  position: fixed;
  top: 0;
  width: 100vw;
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

.container {
  margin-top: 60px;
}

.card {
  background-color: white;
  margin: 30px 0;
  padding: 20px;
  padding-bottom: 0;
}

.card-header {
  font-weight: 600;
  color: #404040;
  font-size: 22px;
  margin-bottom: 15px;
}

.account {
  /* background-color: #F9386A; */
  border-bottom: 1px solid #F2F2F2;
  padding: 15px 10px;
}

.account:last-child {
  border-bottom: none;
}

.account .name {
  font-size: 12px;
  font-weight: 400;
  color: #404040;
  text-transform: uppercase;
}

.account .balance {
  font-family: 'Axiforma';
  font-size: 30px;
  font-weight: 800;
  color: #404040;
}

</style>
  