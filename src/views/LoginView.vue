<template>
    login
    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
</template>
<script setup lang="ts">

import netlifyIdentity from 'netlify-identity-widget';
import { onMounted } from 'vue';

onMounted(()=> {
    // @ts-ignore
    netlifyIdentity.on('init', user => console.log('init', user));
    // @ts-ignore
    netlifyIdentity.on('login', user => console.log('login', user));
    netlifyIdentity.on('logout', () => console.log('Logged out'));
    // @ts-ignore
    netlifyIdentity.on('error', err => console.error('Error', err));
    netlifyIdentity.on('open', () => console.log('Widget opened'));
    netlifyIdentity.on('close', () => console.log('Widget closed'));

    netlifyIdentity.init({
      // container: '#netlify-modal', // defaults to document.body
      locale: 'en' // defaults to 'en'
    });
    
    netlifyIdentity.open(); // open the modal


})

</script>