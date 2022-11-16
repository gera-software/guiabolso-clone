import { defineStore } from 'pinia'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1

const selectedMonth = `${month.toString().padStart(2, '0')}-${year}`

export const useUserStore = defineStore('user', {

    state: () => {
        return {
            userId: import.meta.env.VITE_DEFAULT_USER_ID,
            monthFilter: selectedMonth,
            monthOptions: [
                { text: "Janeiro/23", value: "01-2023" },
                { text: "Dezembro/22", value: "12-2022" },
                { text: "Novembro/22", value: "11-2022" },
                { text: "Outubro/22", value: "10-2022" },
                { text: "Setembro/22", value: "09-2022" },
            ],
        }
    }
})