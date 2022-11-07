<template>
    <h2>Transactions view</h2>
    <pre>
    {{ transactions }}
  </pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'

const transactions = ref([])

async function getTransactions() {
  return api.guiabolsoApi({
    method: 'get',
    url: `/hello`,
  }).then(function (response) {
    console.log(response.data)
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  try {
    transactions.value = await getTransactions()
  } catch(err) {
    console.log(err)
  }    
})

</script>
  
<style scoped>
  
</style>
  