<template>
  <main id="type">
    <navigation-bar>
      <template #title>Time of Day</template>
      <template #left>
        <control-button direction="backward" @click="back"
          >New Meal</control-button
        >
      </template>
    </navigation-bar>
    <form>
      <radio-group
        v-model="value"
        legend="Type"
        compressed
        :values="types"
        name="type"
      />
    </form>
  </main>
</template>

<script>
import ControlButton from '../components/control-button.vue';
import NavigationBar from '../components/navigation-bar.vue';
import RadioGroup from '../components/radio-group.vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

export default {
  name: 'TypeScreen',
  components: {
    ControlButton,
    NavigationBar,
    RadioGroup,
  },
  setup() {
    const route = useRoute();
    const store = route.meta.store();

    const { type, types } = storeToRefs(store);

    return {
      value: type,
      types,
    };
  },
  watch: {
    value() {
      this.back();
    },
  },
  methods: {
    back() {
      this.$router.replace({
        name: 'Add',
      });
    },
  },
};
</script>