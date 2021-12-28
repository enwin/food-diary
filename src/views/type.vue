<template>
  <main id="type" class="screen" :class="classNames">
    <navigation-bar>
      <template #title>Types</template>
      <template #left>
        <control-button @click="cancel">Cancel</control-button>
      </template>
    </navigation-bar>
  </main>
</template>

<script>
import ScreenBase from '../components/screen.vue';
import ControlButton from '../components/control-button.vue';
import NavigationBar from '../components/navigation-bar.vue';

export default {
  name: 'TypeScreen',
  components: {
    ControlButton,
    NavigationBar,
  },
  extends: ScreenBase,
  computed: {
    classNames() {
      const classes = [];

      if (this.mode) {
        classes.push(this.mode);
      }

      return classes;
    },
  },
  methods: {
    cancel() {
      this.$router.replace({
        name: 'AddScreen',
      });
    },
  },
};
</script>