import { createRouter, createWebHistory } from 'vue-router';

import Home from './views/home.vue';
import Add from './views/add.vue';
import Type from './views/type.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    children: [
      {
        path: 'add',
        component: Add,
        name: 'Add',
        children: [
          {
            path: 'type',
            component: Type,
            name: 'Type',
            meta: {
              mode: 'overlay',
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
