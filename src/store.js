import { createPinia } from 'pinia';

const pinia = createPinia();

// do async operation on store startup
pinia.use(({ options, store }) => {
  if (options.init) {
    options.init.apply(store);
  }
});

export default pinia;
