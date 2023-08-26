import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/style.css'
import router from "@/router";
import useConfig from '@/config'


const app = createApp(App)
app.use(router)
app.provide('useConfig',useConfig)
app.mount('#app')
