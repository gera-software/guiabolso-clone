<template>
    <HelloWorld msg="Home view" />
    <button @click="getNubank">get nubank</button>
    <pre>
        {{ nubank }}
    </pre>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';
import { ref } from 'vue';

const nubank = ref({})

async function getNubank() {
    try {
        const response = await axios({
            method: 'get',
            url: `/api/pluggy-get-item`,
        });
    // console.log(response.data)
        nubank.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

</script>
  
<style scoped>
  
</style>
  