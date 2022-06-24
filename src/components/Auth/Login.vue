<script>
import { ref } from 'vue';
import axios from 'axios'
import { useAuthStore }  from '../../store/auth';

export default {
    name: "Login",
    setup() {

        const email = ref('');
        const password = ref('');

        const loginStore = useAuthStore()

        const login = async () => {
            
            await loginStore.login(email.value.toLowerCase(), password.value)

        };
        return {
            email,
            password,
            login,
            loginStore
        };

    }
};

</script>
<template>
    <div class="grid grid-cols-1 justify-items-center">
        <div class="w-6/12 shadow-2xl px-10 rounded-lg mt-20">
            <div class="text-center mt-4 font-rubik text-2xl font-semibold">
                <h1>Login</h1>
            </div>
            <form action="" method="POST" @submit.prevent>
                <div class="flex flex-col">
                    <div class="flex flex-col">
                        <label for="email" class="font-rubik text-2xl font-semibold">Email</label>
                        <input type="email" name="email" id="email" class="border border-gray-300 p-2 rounded-lg"
                            v-model="email" />
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="flex flex-col">
                        <label for="password" class="font-rubik text-2xl font-semibold">Password</label>
                        <input type="password" name="password" id="password"
                            class="border border-gray-300 p-2 rounded-lg" v-model="password" />
                    </div>
                </div>
                <div class="flex flex-col mt-5">
                    <div class="flex flex-col">
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-rubik text-2xl font-semibold py-2 px-4 rounded"
                            @click="login">Login</button>
                    </div>
                </div>

            </form>
            <div class="text-center mb-10">
                <h1 class="text-lg pt-5 hover:text-blue-500">
                    <router-link to="/register">Register</router-link>
                </h1>
            </div>

        </div>
    </div>

</template>

<style scoped>
input {
    @apply bg-cyan-100 text-xl font-rubik;
}
</style>