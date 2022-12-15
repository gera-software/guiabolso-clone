<template>
        <div class="account" @click="goToExtract(account._id?.toString())">
          <img class="account-logo" :src="account.imageUrl?.toString()" />
          <div>
            <div class="name">{{account.name}}</div>
            <div class="balance">R$ {{ (+account.balance / 100).toFixed(2) }}</div>
            <div class="date" v-if="account.syncType === 'AUTOMATIC'"><font-awesome-icon icon="fa-solid fa-arrows-rotate" /> Atualizado em {{ (new Date(""+account.sync?.lastSyncAt)).toLocaleString() }} <span class="badge" v-if="account.sync">{{account.sync.syncStatus}}</span> </div>
            <div class="date" v-else><font-awesome-icon icon="fa-solid fa-user" /> Conta manual</div>
            <pre>{{account.sync}}</pre>
            <button @click="updateItem(account.sync?.pluggyItemId, $event)">update</button>
          </div>
        </div>
</template>
<script setup lang="ts">
import { AccountSummaryDTO } from '../config/types';
import { useRouter } from 'vue-router';
import api from '../config/axios.js'

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

async function getConnectToken(itemId?: string | undefined) {
    return api.guiabolsoApi({
        method: 'get',
        url: '/pluggy-connect-token',
        params: {
            itemId: itemId ?? ''
        }
    }).then((response) => {
        // console.log(response)
        return response.data.accessToken
    })
}

async function updatePluggyConnectWidget(itemId: string | undefined) {
    //@ts-ignore
    const existingItemIdToUpdate = itemId
    console.log('update', existingItemIdToUpdate)
    //@ts-ignore
    const accessToken: string = await getConnectToken(existingItemIdToUpdate)

    // configure the Pluggy Connect widget instance
    // @ts-ignore
    const pluggyConnect = new PluggyConnect({
    connectToken: accessToken,
    updateItem: existingItemIdToUpdate, // by specifying the Item id to update here, Pluggy Connect will attempt to trigger an update on it, and/or prompt credentials request if needed.
    includeSandbox: true, // note: not needed in production
    onSuccess: (itemData: Object) => {
        // TODO: Implement logic for successful connection
        // The following line is an example, it should be removed when implemented.
        console.log('Yay! Pluggy connect success!', itemData);
        //@ts-ignore
        // item.value = itemData.item
    },
    onError: (error: Object) => {
        // TODO: Implement logic for error on connection
        // The following line is an example, it should be removed when implemented.
        console.error('Whoops! Pluggy Connect error... ', error);
    },
    });

    // Open Pluggy Connect widget
    pluggyConnect.init();
}

async function updateItem(itemId: string | undefined, event: Event) {
  event.stopImmediatePropagation()
  await updatePluggyConnectWidget(itemId)
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

.badge {
  background: gray;
  color: black;
  padding: 0px 10px;
  border-radius: 4px;
}
</style>