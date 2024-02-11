import { createApp } from 'vue';
import '../node_modules/bulma/css/bulma.css';
import router from './router/routes';
import App from './App.vue';

createApp(App).use(router).mount('#app');
