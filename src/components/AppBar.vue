<template>
  <div class="app-bar">
    <BackButton/>
    <div class="content">
        <slot>
            <h1>{{title}}</h1>
        </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'

defineProps<{
    title?: String
}>()
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
  z-index: 2;
}

.app-bar .content {
    margin-left: 40px;
}

.app-bar h1 {
  margin: 0;
  font-weight: 600;
  font-size: 22px;
  color: #404040;
}


</style>