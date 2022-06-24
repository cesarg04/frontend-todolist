import axios from 'axios'
import { defineStore } from 'pinia'
import { rootUrl } from '../composables/settings'

export const useAuthStore = defineStore('login', {

  state: () => ({
    token: ''
  }),
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async login(email, password) {

      try {
        const loginAction = await axios.post(rootUrl + '/auth', { email, password })

        this.$state.token = loginAction.data.token

        localStorage.setItem('token', loginAction.data.token)

        this.$router.push({ name: 'Home' })

      } catch (error) {

        console.log(error)

      }

    },

    async register(data) {

      const { nombre, email, password, rol } = data;
      const registerAction = await axios.post(rootUrl + '/usuarios', {nombre, email, password, rol})

    },

    async logout(){
      this.$router.push({ name: 'Login' })
      this.$state.token = ''
      localStorage.removeItem('token')

    }


  },

});
