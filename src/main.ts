import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router'
import './assets/chrons.css';

import App from './App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [], // we add all routes inside App.vue
});


const app = createApp(App);
app.use(router);
app.mount('#app');
