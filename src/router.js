import { createRouter, createWebHistory } from 'vue-router';

import { addMeal } from './store/meal';

import Home from './views/home.vue';
import Add from './views/add.vue';
import ModalSelect from './views/modal-select.vue';

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
            component: ModalSelect,
            name: 'Type',
            props: true,
            meta: {
              mode: 'overlay',
              store: addMeal,
            },
          },
          {
            path: 'effect',
            component: ModalSelect,
            name: 'Effect',
            props: true,
            meta: {
              mode: 'overlay',
              store: addMeal,
            },
          },
        ],
        meta: {
          mode: 'overlay',
          store: addMeal,
        },
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
