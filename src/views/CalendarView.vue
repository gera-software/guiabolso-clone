<template>
    <AppBar>
        <select class="app-bar-select" v-model="store.monthFilter">
        <option v-for="option in store.monthOptions" :value="option.value">
            Agenda de {{ option.text }}
        </option>
        </select>
    </AppBar>
    <div class="container">
    <CalendarSummary></CalendarSummary>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/store';
import AppBar from '@/components/AppBar.vue'
import CalendarSummary from '@/components/CalendarSummary.vue'


const router = useRouter()

const store =  useUserStore()

</script>

<style scoped>

.app-bar-select {
    margin: 0;
    font-weight: 600;
    font-size: 22px;
    color: #404040;
    border: none;
    background-color: white;
}

.container {
    padding-top: 60px;
    padding-bottom: 80px;
}

</style>
