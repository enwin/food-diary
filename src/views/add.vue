<template>
  <main id="add">
    <navigation-bar>
      <template #title>New Meal</template>
      <template #left>
        <control-button @click="cancel">Cancel</control-button>
      </template>
      <template #right>
        <control-button :disabled="true" @click="add">Add</control-button>
      </template>
    </navigation-bar>
    <form>
      <input-link
        v-model="type"
        label="Time of Day"
        :label-value="currentType"
        :to="{ name: 'Type' }"
        name="type"
      />
      <form-group legend="Details" compressed>
        <input-text
          v-model="name"
          variant="placeholder"
          label="Meal"
          name="name"
        />
        <input-text
          v-model="ingredients"
          variant="placeholder"
          label="Ingredients"
          name="ingredients"
        />
      </form-group>
    </form>
  </main>
</template>

<script>
import ControlButton from '../components/control-button.vue';
import NavigationBar from '../components/navigation-bar.vue';
import InputLink from '../components/input-link.vue';
import InputText from '../components/input-text.vue';
import FormGroup from '../components/form-group.vue';
import { markRaw } from 'vue';

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
    range: [new Date().setHours(19, 30, 0), new Date().setHours(22, 30, 0)],
  },
  {
    label: 'Snack',
    value: 3,
    range: [],
  },
];

export default {
  name: 'AddScreen',
  components: {
    ControlButton,
    NavigationBar,
    InputLink,
    InputText,
    FormGroup,
  },
  // extends: ScreenBase,
  data() {
    const now = Date.now();
    let type = types.findIndex(({ range }) => {
      const [start, end] = range;

      if (start <= now && now <= end) {
        return true;
      }
    });

    if (type === -1) {
      type = 3;
    }

    return {
      name: '',
      ingredients: '',
      type: type.toString(),
      types: markRaw(
        types.map((type) => {
          const { range, ...typeData } = type;

          return typeData;
        })
      ),
    };
  },
  computed: {
    classNames() {
      const classes = [];

      if (this.mode) {
        classes.push(this.mode);
      }

      return classes;
    },
    currentType() {
      return this.types[this.type].label;
    },
  },
  methods: {
    add() {
      this.cancel();
    },
    cancel() {
      this.$router.replace({
        name: 'Home',
      });
    },
  },
};
</script>

<style lang="scss">
#add {
  background-color: var(--material-background-chrome-solid);

  form > .input-link {
    margin: rem(35) rem(16) 0;
  }
}
</style>