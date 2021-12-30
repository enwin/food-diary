import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

// force push to use replace
router._push = router.push;
router.push = function (...args) {
  return router.replace(...args);
};

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.config.devtools = import.meta.env.MODE === 'development';

app.mount('#app');
