import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            userId: import.meta.env.VITE_DEFAULT_USER_ID
        }
    }
})