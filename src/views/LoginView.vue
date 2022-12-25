<template>
  <div class="hero">

  </div>
  <div class="container">
    <button class="button" @click="openNetlifyModal">Começar</button>
    <router-link :to="{ name: 'dashboard'}">dashboard</router-link>
  </div>
</template>
<script setup lang="ts">

import { useUserStore } from '../stores/userStore';

const userStore = useUserStore()

function openNetlifyModal() {
  userStore.openModal()

}

// onMounted(async () => {
//   const u = getUser()
//   if(u) {
//     await getUserByNetlifyId(u)
//     if(userStore._id) {
//       router.push({ name: 'dashboard' })
//     }
//   }
// })



</script>
<style scoped>
.hero {
  background-image: url('@/assets/LoginCover.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 80vh;
  background-color: #250048;
}

.container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 30px;
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

.button.button-outline {
  background-color: transparent;
  color: #F9386A;
}
</style>