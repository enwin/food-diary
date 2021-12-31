import { defineStore } from 'pinia';
import { markRaw } from 'vue';

const swallowTypes = ['Normal', 'Reduced', 'Blocked but pushed', 'Blocked'];

export const addMeal = defineStore('meal', {
  state: () => {
    const today = new Date();
    const now = today.getTime();
    const types = [
      {
        label: 'Breakfast',
        value: 0,
        range: [new Date().setHours(6, 30, 0), new Date().setHours(11, 30, 0)],
      },
      {
        label: 'Lunch',
        value: 1,
        range: [new Date().setHours(11, 30, 1), new Date().setHours(15, 30, 0)],
      },
      {
        label: 'Dinner',
        value: 2,
        range: [new Date().setHours(19, 30, 0), new Date().setHours(22, 23, 0)],
      },
      {
        label: 'Snack',
        value: 3,
        range: [],
      },
    ];

    const currentType = types.find(({ range }) => {
      const [start, end] = range;

      if (start <= now && now <= end) {
        return true;
      }
    });

    const type = (currentType ? currentType.value : 3).toString();

    return {
      name: '',
      ingredients: '',
      today: today.toISOString().split('T')[0],
      type,
      swallowingLevel: '0',
      swallowing: markRaw(
        swallowTypes.map((label, index) => {
          return {
            label,
            value: index,
          };
        })
      ),
      types: markRaw(
        types.map((type) => {
          const { range, ...typeData } = type;

          return typeData;
        })
      ),
    };
  },
  getters: {
    currentType(state) {
      return state.types[state.type].label;
    },
    swallowingType(state) {
      return state.swallowing[state.swallowingLevel].label;
    },
  },
});
