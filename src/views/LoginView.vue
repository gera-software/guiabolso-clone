<template>
  <div class="hero">

  </div>
  <div class="container">
    <button class="button" @click="openNetlifyModal">Começar</button>
    app version {{ version }}
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const router = useRouter()

const userStore = useUserStore()

// @ts-ignore
const version: string = __APP_VERSION__;

userStore.$subscribe((mutation, state) => {
  console.log('MUTATED STATE', state)
  if(state.user._id) {
    router.push({ name: 'dashboard'})
  }
})

function openNetlifyModal() {
  userStore.openModal()

}

onMounted(async () => {
  if(userStore.tokenIsValid()) {
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
    cursor: pointer;
}

.button.button-outline {
  background-color: transparent;
  color: #F9386A;
}
</style>