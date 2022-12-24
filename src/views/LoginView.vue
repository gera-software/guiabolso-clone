<template>
  <div class="hero">

  </div>
  <div class="container">
    <button class="button" @click="openNetlifyModal">Começar</button>
  </div>
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
import { useNetlifyIdentity } from '@/composables/useNetlifyIdentity.js'
import { useRouter } from 'vue-router';

const { onOpen, onLogin, openModal, closeModal, getUser } = useNetlifyIdentity()

const router = useRouter()

onOpen((user: any) => {
  console.log('onOpen', user)
})

onLogin((user: any) => {
  const { id, email, token, user_metadata } = user
  console.log('onLogin', id, email, token, user_metadata)
  closeModal()
  router.push({ name: 'dashboard' })
})

function openNetlifyModal() {
  openModal()

}

onMounted(() => {
  const user = getUser()
  if(user) {
    router.push({ name: 'dashboard' })
  }
})

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