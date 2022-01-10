<template>
  <main id="view">
    <navigation-bar>
      <template #title>{{ title }}</template>
      <template #left>
        <control-button @click="close">Close</control-button>
      </template>
    </navigation-bar>
  </main>
</template>

<script>
import ControlButton from '../components/control-label.vue';
import NavigationBar from '../components/navigation-bar.vue';

export default {
  name: 'ViewScreen',
  components: {
    ControlButton,
    NavigationBar,
  },
  data() {
    return {
      title: 'New Meal',
    };
  },
  methods: {
    close() {
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
</style>