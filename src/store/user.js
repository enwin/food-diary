import { defineStore } from 'pinia';

const dropboxKeys = [
  'token_type',
  'access_token',
  'scope',
  'uid',
  'account_id',
];

export const userStore = defineStore('user', {
  state: () => {
    const store = {};

    dropboxKeys.forEach((key) => {
      store[key] = window.localStorage.getItem(key) || '';
    });

    return store;
  },
  actions: {
    saveDropbox(data) {
      data.forEach(([key, value]) => {
        if (!dropboxKeys.includes(key)) {
          return;
        }

        this[key] = value;
        window.localStorage.setItem(key, value);
      });
    },
  },
});
