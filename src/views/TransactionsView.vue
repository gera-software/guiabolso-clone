<template>
    <h2>Transactions view</h2>
    <input v-model="monthFilter" type="month">
    {{monthFilter}}

    <pre>
    {{ transactions }}
  </pre>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'

const monthFilter = ref('')

watch(monthFilter, async () => {
    const [ year, month ] = monthFilter.value.split('-')
    console.log(year, month)

    await getTransactions(year, month)

})

const transactions = ref([])

async function getTransactions(year: String, month: String) {
    console.log(year, month)
  return api.guiabolsoApi({
    method: 'get',
    url: `/get-transactions?year=${year}&month=${month}`,
  }).then(function (response) {
    console.log(response.data)
    transactions.value = response.data
    return response.data
  }).catch(function (error) {
    console.log(error.response?.data);
  })
}

onMounted(async () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  monthFilter.value = `${year}-${month.toString().padStart(2, '0')}`

})

</script>
  
<style scoped>
  
</style>
  