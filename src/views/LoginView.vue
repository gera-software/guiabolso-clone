<template>
  <div class="hero">

  </div>
  <div class="container">
    <button class="button" @click="openNetlifyModal">Começar</button>
  </div>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useNetlifyIdentity } from '../composables/useNetlifyIdentity'
import { useUserStore } from '../stores/store';
import { useRouter } from 'vue-router';
import api from '../config/axios.js'
import { User } from '../config/types';

const userStore = useUserStore()

const { onOpen, onLogin, openModal, closeModal, getUser } = useNetlifyIdentity()

const router = useRouter()

onOpen((user: any) => {
  console.log('onOpen', user)
})

onLogin(async (user: any) => {
  const { id: netlifyId, email, token, user_metadata } = user
  console.log('onLogin', netlifyId, email, token, user_metadata)
  await getUserByNetlifyId(netlifyId)
  closeModal()
  router.push({ name: 'dashboard' })
})

function openNetlifyModal() {
  openModal()

}

onMounted(async () => {
  const u = getUser()
  await getUserByNetlifyId(u?.id.toString())
  if(user.value) {
    router.push({ name: 'dashboard' })
  }
})

const loading = ref(false)

const user = ref<User | null>(null)

async function getUserByNetlifyId(id: string | undefined) {
  loading.value = true
  return api.guiabolsoApi({
    method: 'get',
    url: `/user-get-by-netlify-id?netlifyId=${id}`,
  }).then(function (response) {
    user.value = response.data
    console.log(user.value)
    loading.value = false
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

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