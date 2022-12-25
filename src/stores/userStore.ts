import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNetlifyIdentity } from '../composables/useNetlifyIdentity'
import api from '../config/axios.js'


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

export const useUserStore = defineStore('user', () => {

    // const router = useRouter()

    const { onLogout, logout: netlifyLogout, onOpen, onLogin, openModal, closeModal, getUser } = useNetlifyIdentity()

    onLogout(()=> {
        console.log('não é que fez logout mesmo...')
        // router.push({ name: 'login' })
    })

    // user: { _id: import.meta.env.VITE_DEFAULT_USER_ID },
    // user: {} as authInfo,
    const _id = ref('')
    const email = ref('')
    const name = ref('')
    const netlifyId = ref('')
    const token = ref({
        access_token: '',
        expires_at: 0,
        expires_in: 0,
        refresh_token: '',
        token_type: '',
    })
   
 
    function logout() {
        console.log('porque ta fazendo logout aqui??????')
        netlifyLogout()
        _id.value = ''
        email.value = ''
        name.value = ''
        netlifyId.value = ''
        token.value = {
            access_token: '',
            expires_at: 0,
            expires_in: 0,
            refresh_token: '',
            token_type: '',
        }
    }

    onLogin(async (user: any) => {
        const { id: netlifyId, email, token, user_metadata } = user
        console.log('onLogin', netlifyId, email, token, user_metadata)
        const authInfo = await getUserByNetlifyId(user)
        setUser(authInfo)
        closeModal()
        // router.push({ name: 'dashboard' })
    })

    async function getUserByNetlifyId(u: any) {
        return api.guiabolsoApi({
          method: 'get',
          url: `/user-get-by-netlify-id?netlifyId=${u.id}`,
        }).then(function (response) {
          return {
            ...response.data,
            token: u.token,
          }
        }).catch(function (error) {
          console.log(error.response?.data);
        })
    }
    
    function setUser(u: authInfo) {
        console.log('SET USER', u)
        _id.value = u._id
        email.value = u.email
        name.value = u.name
        netlifyId.value = u.netlifyId
        token.value = u.token
        console.log('ta fazendo login ou não?', _id)
    }

        
    return {
        _id,
        email,
        name,
        netlifyId,
        token,
        logout,
        openModal,
    }
  
})