<template>
  <button @click="openNetlifyModal">Login</button>
    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
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