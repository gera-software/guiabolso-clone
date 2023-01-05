<template>
    category input
    <button type="button" @click="openModal">open</button>

    <Teleport to="body">
        <div v-if="open" class="modal modal--fullscreen">
            <div class="page">
                <AppBar title="Categorias">
                    <template v-slot:button>
                        <button @click="open = false" class="back-icon">
                            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                        </button>
                    </template>
                </AppBar>
                <div class="container">
                    <p v-for="n in 50">Hello from the modal!</p>
                    <button @click="open = false">Close</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppBar from '@/components/AppBar.vue'


const open = ref(false)

function openModal() {
    console.log('open modal')
    open.value = true
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  background-color: aquamarine;
  overflow-y: auto;
}

.modal--fullscreen {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.back-icon {
  color: #F9386A;
  margin-right: 40px;
  padding: 0;
  font-size: 16px;
  height: 16px;
  border: none;
}

.container {
  padding-top: 60px;
}
</style>