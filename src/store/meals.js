import { defineStore } from 'pinia';
import { getData } from '../data/client';
import { userStore } from './user';

export const mealsStore = defineStore('meals', {
  state: () => {
    const store = {
      meals: [],
      synced: false,
    };

    return store;
  },
  actions: {
    async getData() {
      this.meals = (await getData('meals')) || [];
      this.synced = true;
    },
  },
  init() {
    const user = userStore();

    if (user.access_token && !this.synced) {
      this.getData();
    }
  },
});
