<template>
  <main id="add">
    <navigation-bar>
      <template #title>{{ title }}</template>
      <template #left>
        <control-button @click="cancel">Cancel</control-button>
      </template>
      <template #right>
        <control-button :disabled="true" @click="add">Add</control-button>
      </template>
    </navigation-bar>
    <form>
      <form-group legend="Details" compressed>
        <input-text
          v-model="name"
          v-autofocus
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
      <form-group legend="Effect" compressed>
        <input-link
          v-model="swallowing"
          :label="effectLabel"
          :label-value="swallowing"
          :to="effectLink"
          name="type"
        />
      </form-group>
      <form-group legend="Time" compressed>
        <input-link
          v-model="type"
          :label="typeLabel"
          :label-value="currentType"
          :to="typeLink"
          name="type"
        />
        <input-date v-model="today" label="Date" name="date" />
      </form-group>
    </form>
  </main>
</template>

<script>
import ControlButton from '../components/control-label.vue';
import NavigationBar from '../components/navigation-bar.vue';
import InputDate from '../components/input-date.vue';
import InputLink from '../components/input-link.vue';
import InputText from '../components/input-text.vue';
import FormGroup from '../components/form-group.vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

export default {
  name: 'AddScreen',
  components: {
    ControlButton,
    NavigationBar,
    InputDate,
    InputLink,
    InputText,
    FormGroup,
  },
  setup() {
    const route = useRoute();
    const store = route.meta.store();

    const { ingredients, name, swallowingLevel, today, type } =
      storeToRefs(store);

    return {
      ingredients,
      name,
      routeName: route.name,
      store,
      swallowingLevel,
      today,
      type,
    };
  },
  data() {
    return {
      title: 'New Meal',
      effectLabel: 'Swallowing',
      typeLabel: 'Time of Day',
    };
  },
  computed: {
    currentType() {
      return this.store.currentType;
    },
    effectLink() {
      return {
        name: 'Effect',
        params: {
          parentTitle: this.title,
          parentName: this.routeName,
          title: this.effectLabel,
          valuesKey: 'swallowing',
          valueKey: 'swallowingLevel',
        },
      };
    },
    swallowing() {
      return this.store.swallowingType;
    },
    typeLink() {
      return {
        name: 'Type',
        params: {
          parentTitle: this.title,
          parentName: this.routeName,
          title: this.typeLabel,
          valuesKey: 'types',
          valueKey: 'type',
        },
      };
    },
  },
  beforeUnmount() {
    this.store.$reset();
  },
  methods: {
    add() {
      this.cancel();
    },
    cancel() {
      if (navigator.standalone) {
        this.$router.replace({
          name: 'Home',
        });
      } else {
        this.$router.back();
      }
    },
  },
};
</script>

<style lang="scss">
#add {
  .navigation-bar {
    flex-shrink: 0;
  }

  form {
    min-height: 100%;
  }
}
</style>