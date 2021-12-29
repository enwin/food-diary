<template>
  <main id="type">
    <navigation-bar>
      <template #title>Time of Day</template>
      <template #left>
        <control-button direction="backward" @click="cancel"
          >New Meal</control-button
        >
      </template>
    </navigation-bar>
  </main>
</template>

<script>
import ControlButton from '../components/control-button.vue';
import NavigationBar from '../components/navigation-bar.vue';

export default {
  name: 'TypeScreen',
  components: {
    ControlButton,
    NavigationBar,
  },
  methods: {
    cancel() {
      this.$router.replace({
        name: 'Add',
      });
    },
  },
};
</script>