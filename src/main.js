import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css' // Import Tailwind CSS
import router from './router' // Import the router

createApp(App).use(router).mount('#app')
