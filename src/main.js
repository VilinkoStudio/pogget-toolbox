import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 确保引入了路由

createApp(App).use(router).mount('#app')