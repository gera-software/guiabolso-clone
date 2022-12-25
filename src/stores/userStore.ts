import { defineStore } from 'pinia'

type authInfo = {
    _id: string,
    name: string,
    email: string,
    netlifyId: string,
    token: {
        access_token: string,
        expires_at: EpochTimeStamp,
        expires_in: EpochTimeStamp,
        refresh_token: string,
        token_type: string,
    }
}

export const useUserStore = defineStore('user', {

    state: () => {
        return {
            // user: { _id: import.meta.env.VITE_DEFAULT_USER_ID },
            // user: {} as authInfo,
            _id: 'meu pai do ceu',
            email: '',
            name: '',
            netlifyId: '',
            token: {
                access_token: '',
                expires_at: 0,
                expires_in: 0,
                refresh_token: '',
                token_type: '',
            }
        }
    },

    actions: {
        logout() {
            this.$reset()
        },
        login(u: authInfo) {
            console.log('LOGGGGINN', u)
            this._id = u._id
            this.email = u.email
            this.name = u.name
            this.netlifyId = u.netlifyId
            this.token = u.token
            // console.log('ta fazendo login ou não?', this.user)
        }
    }
})