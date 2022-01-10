import { defineStore } from 'pinia';
import { getData, setData } from '../data/client';
import { userStore } from './user';
import { v4 as randomUUID } from 'uuid';

const dateTimeFormat = Intl.DateTimeFormat('default', {
  weekday: 'long',
  day: 'numeric',
  month: 'short',
});

const listDate = (date) => {
  return dateTimeFormat
    .formatToParts(date)
    .map(({ type, value }) => {
      if (type === 'literal') {
        return null;
      }

      return value;
    })
    .filter(Boolean)
    .join(' ');
};

const listMeals = (meals) => {
  return meals.map(({ id, name, effect, type }) => {
    return {
      id,
      name,
      effect,
      type,
    };
  });
};

export const mealsStore = defineStore('meals', {
  state: () => {
    const store = {
      meals: {},
      synced: false,
    };

    return store;
  },
  getters: {
    list() {
      return Object.entries(this.meals).map(([key, value]) => {
        return {
          key,
          day: listDate(new Date(key)),
          meals: listMeals(value),
        };
      });
    },
  },
  actions: {
    async getData() {
      this.meals = (await getData('meals')) || {};
      this.synced = true;
    },
    save(data) {
      const { date, ...meal } = data;

      if (!meal.id) {
        meal.id = randomUUID();
      }

      console.log(meal);

      let dateMeals;

      if (!this.meals[date]) {
        dateMeals = [];
      } else {
        dateMeals = [...this.meals[date]];
      }

      dateMeals.push(meal);

      dateMeals.sort(
        (currentMeal, nextMeal) => currentMeal.type - nextMeal.type
      );

      this.meals[date] = dateMeals;

      setData('meals', this.meals)
        .then(() => {
          console.log('saved!');
        })
        .catch((err) => {
          console.warn(err);
        });
    },
  },
  init() {
    const user = userStore();

    if (user.access_token && !this.synced) {
      this.getData();
    }
  },
});
