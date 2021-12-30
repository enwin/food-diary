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
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

export default {
  name: 'AddScreen',
  components: {
    ControlButton,
    NavigationBar,
    InputLink,
    InputText,
    FormGroup,
  },
  setup() {
    const route = useRoute();
    const store = route.meta.store();

    const { name, type, ingredients } = storeToRefs(store);

    return {
      store,
      name,
      type,
      ingredients,
    };
  },
  computed: {
    currentType() {
      return this.store.currentType;
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