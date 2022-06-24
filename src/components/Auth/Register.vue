<script>
import { ref, inject } from 'vue'
import { useAuthStore } from '../../store/auth'

    export default{
        name: 'Register',
        setup(){
            const registerStore = useAuthStore();
            const name = ref('')
            const email = ref('');
            const password = ref('');
            const toast = inject('toast')
            
            const register = async() => {

                if (password.value.length < 8) {
                    return console.log("The password require 8 caracters")
                }

                const data = {
                    nombre: name.value,
                    email: email.value.toLowerCase(),
                    password: password.value,
                    rol: 'USER_ROLE'
                }
                try {

                    const regsiterPut = await registerStore.register(data)
                    console.log(regsiterPut)
                    
                    toast.success(`User register sucsessfuly`, {
                        position: "top-right",
                        duration: 3000,
                        })

                    // Clear the inputs
                    name.value = ''
                    email.value = ''
                    password.value = ''

                } catch (error) {
                    const dataErr = error.response.data.errors[0]
                    toast.error(`${dataErr.msg}`, {
                            position: "top-right",
                            duration: 3000,
                        })
                       
                }
            } 

            return{
                name,
                email,
                password,
                register
            }
        }

    }

</script>

<template>
    <div class="grid grid-cols-1 justify-items-center">
        <div class="w-6/12 shadow-2xl px-10 roundes-lg mt-20">
            <form action="" method="post" @submit.prevent>
                    <div class="flex flex-col">
                        <label for="name" class="font-rubik text-2xl font-semibold">Name</label>
                        <input type="text" name="name" id="name" class="" v-model="name" required/>
                    </div>

                    <div class="flex flex-col">
                        <label for="email" class="font-rubik text-2xl font-semibold">Email</label>
                        <input type="email" name="email" id="email" class="" v-model="email" required/>
                    </div>
                    <div class="flex flex-col">
                        <label for="password" class="font-rubik text-2xl font-semibold">Password</label>
                        <input type="password" name="password" id="password" class="" v-model="password" required/>
                    </div>

                    <div class="flex flex-col mt-5">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-rubik text-2xl font-semibold py-2 px-4 rounded" @click="register">Register</button>
                    </div>
            </form>

            <div class="text-center mb-10">
                <h1 class="text-lg pt-5 hover:text-blue-500">
                    <router-link :to="{name: 'Login'}">Login</router-link>
                </h1>
            </div>

        </div>
        

    </div>
</template>

<style scoped>
input{

    @apply border border-gray-300 p-2 rounded-lg bg-inputs font-rubik text-xl;

}



</style>