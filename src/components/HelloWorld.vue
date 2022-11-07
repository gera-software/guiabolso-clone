<script setup lang="ts">
import { ref } from 'vue'
import api from '../config/axios.js'
import { onMounted } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
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

<template>
  <h1>{{ msg }}</h1>

  <pre>
    {{ transactions }}
  </pre>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
