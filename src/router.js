import { createRouter, createWebHistory } from 'vue-router';

import { addMeal } from './store/meal';

import Home from './views/home.vue';
import Auth from './views/auth.vue';
import Add from './views/add.vue';
import View from './views/view.vue';
import Login from './views/login.vue';
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
      {
        path: 'view/:id',
        component: Add,
        name: 'View',
        props: true,
        meta: {
          mode: 'overlay',
        },
      },
    ],
  },
  {
    path: '/auth',
    component: Auth,
    name: 'Auth',
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if (navigator.standalone) {
  // force push to use replace
  router._push = router.push;
  router.push = function (...args) {
    return router.replace(...args);
  };
}

export default router;
