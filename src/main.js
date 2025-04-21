import { createApp } from 'vue'
import './assets/style/style.css'
import App from './App.vue'
import router from './router/index.js';

createApp(App)
    .use(router)
    .mount('#app')
