import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/home.vue';
import Add from './views/add.vue';
import Type from './views/type.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'HomePage',
    children: [
      {
        path: 'add',
        component: Add,
        name: 'AddScreen',
        children: [
          {
            path: 'type',
            component: Type,
            name: 'TypeScreen',
            meta: {
              mode: 'slide',
            },
          },
        ],
        meta: {
          mode: 'overlay',
        },
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
