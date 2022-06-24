import axios from 'axios'
import { defineStore } from 'pinia'
import { rootUrl } from '../composables/settings'



export const useTaskStore = defineStore('tasks', {

    state: () => ({
        token: ''
    }),
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {

        init(){
            const token =  localStorage.getItem('token');

            if (!token) {
                this.$router.push({ name: 'Login' })
            }else{
                this.$state.token = token
            }
            
        },
        async getTasks(){
            try {
                const tasks = await axios.get(rootUrl + '/tareas', {headers: { 'x-token': this.$state.token }})
                //console.log(tasks.data)
                return tasks.data;
            } catch (error) {
                console.log(error.response.data)
                this.$router.push({ name: 'Login' })
            }
        }

    },
  })