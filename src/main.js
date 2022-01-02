import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.config.devtools = import.meta.env.MODE === 'development';

app.directive('autofocus', {
  mounted(el) {
    const focussable = el.querySelector('input, textarea');

    if (focussable) {
      focussable.focus();
    }
  },
});

app.mount('#app');
