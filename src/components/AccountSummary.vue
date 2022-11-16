<template>
        <div class="account" @click="goToExtract(account._id?.toString())">
          <img class="account-logo" :src="account.imageUrl?.toString()" />
          <div>
            <div class="name">{{account.name}}</div>
            <div class="balance">R$ {{ (+account.balance / 100).toFixed(2) }}</div>
            <div class="date" v-if="account.syncType === 'AUTOMATIC'"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Atualizado em {{ (new Date(""+account.connection?.lastUpdatedAt)).toLocaleString() }}</div>
            <div class="date" v-else><font-awesome-icon icon="fa-solid fa-user" /> Conta manual</div>
          </div>
        </div>
</template>
<script setup lang="ts">
import { AccountSummaryDTO } from '../config/types';
import { useRouter } from 'vue-router';

defineProps<{
    account: AccountSummaryDTO
}>()

const router = useRouter()

function goToExtract(accountId: String | undefined) {
  router.push({
    name: 'extract-by-account',
    params: {
      id: accountId?.toString()
    }
  })
}

</script>
<style scoped>

.account {
  /* background-color: #F9386A; */
  border-bottom: 1px solid #F2F2F2;
  padding: 15px 0px;
  display: flex;
}

.account:last-child {
  border-bottom: none;
}

.account-logo {
  border: 1px solid #F2F2F2;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}

/* .account-logo.account-logo--wallet {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #F9386A;
  background-color: #FFF5F8;
} */

.account .name {
  font-size: 12px;
  font-weight: 400;
  color: #404040;
  text-transform: uppercase;
}
.account .date {
  font-size: 12px;
  font-weight: 400;
  color: #404040;
}

.account .balance {
  font-family: 'Axiforma';
  font-size: 30px;
  font-weight: 800;
  color: #404040;
}
</style>