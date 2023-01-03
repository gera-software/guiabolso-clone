<template>
  <!-- <ul style="margin:0">
    <li>
      <router-link to="/">Home</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'transactions' }">Transactions</router-link>
    </li>
  </ul> -->
  <router-view v-slot="{ Component }">
    <transition name="slide-left" mode="in-out">
      <component :is="Component" />
    </transition>
  </router-view>
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
.page {
  background-color: #FAFAFA;
  height: 100dvh;
  position: absolute;
  width: 100dvw;
  overflow-y: auto;
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity .5s ease;
}

.fade-enter-from,
.fade-leave-to {
  position: absolute;
  width: 100%;
  opacity: 0;
}


.slide-left-enter-from {
  transform: translateX(100%);

}
.slide-left-enter-active {
  /* position: absolute;
  width: 100%; */
  transition: transform .5s ease-out;
}

.slide-left-enter-to {
  /* position: absolute;
  width: 100%; */
  z-index: 100;
  transform: translateX(0%);
}

.slide-left-leave-from {
  /* transform: translateX(100%); */
  z-index: 0;

}
.slide-left-leave-active {
  /* position: absolute;
  width: 100%; */
  /* transition: transform .5s ease; */
}

.slide-left-leave-to {
  /* z-index: 0; */
  /* opacity: 0; */
  /* position: absolute; */
  /* width: 100%; */
  /* transform: translateX(0); */
}


</style>
