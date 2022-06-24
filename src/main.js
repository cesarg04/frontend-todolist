import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { markRaw } from 'vue';
import Toaster from '@meforma/vue-toaster';

import './index.css'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
});

const app = createApp(App)
    app.use(Toaster, {
        position: 'bottom-right',
        useDefaultCss: true,
        pauseOnHover: false
    }).provide('toast', app.config.globalProperties.$toast)
    app.use(router)
    app.use(pinia)
    app.mount('#app')
