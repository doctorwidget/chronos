import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router'
import './assets/chrons.css';

import App from './App.vue';
import { routes } from './routes/routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
});


const app = createApp(App);
app.use(router);
app.mount('#app');
