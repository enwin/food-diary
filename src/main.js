import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);

app.config.devtools = import.meta.env.MODE === 'development';

app.mount('#app');
