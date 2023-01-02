<template>
  <!-- <ul style="margin:0">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'transactions' }">Transactions</router-link>
    </li>
  </ul> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// @ts-ignore
import Toastify from 'toastify-js'

onMounted(() => {
  window.addEventListener('offline', () => {
    // Update your UI to reflect that there's no connection.
    // window.alert('you are offline')
    Toastify({
            duration: 5000,
            text: `<h4 style='display: inline'>Você está offline mesmo...</h4> `,
            escapeMarkup: false,
            gravity: "top",
          }).showToast();
  });
  
  window.addEventListener('online', () => {
    // Update your UI to reflect that the connection is back.
    // window.alert('you are online')
    Toastify({
            duration: 5000,
            text: `<h4 style='display: inline'>Agora tá de volta online</h4> `,
            escapeMarkup: false,
            gravity: "top",
          }).showToast();
  });
})
</script>

<style scoped>
</style>
