<template><main /></template>

<script>
export default {
  name: 'ScreenBase',
  computed: {
    disabled() {
      return this.$route.name !== this.$.type.name || null;
    },
    mode() {
      return this.$route.meta.mode;
    },
  },
};
</script>

<style lang="scss">
@keyframes slideIn {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.screen[id] {
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  padding-top: env(safe-area-inset-top);
  position: relative;
  min-height: 100%;
  transform-origin: 50% 0;
  transition: all $duration $easing;
  z-index: 1;

  &[disabled].overlay {
    background-color: var(--background-color-inert);
    height: 100vh;
    overflow: hidden;
    top: 0;
    transform: translateY(#{rem(44)}) scale(var(--inertScale));
  }

  &.overlay {
    border-radius: 10px 10px 0 0;
    height: calc(100vh - #{rem(54)});
    left: 0;
    position: fixed;
    width: 100%;
    // z-index: 1;

    &:not([disabled]) {
      top: rem(54);
    }

    &.v-enter-active,
    &.v-leave-active {
      transition: transform $duration $easing;
    }

    &.v-enter-from,
    &.v-leave-to {
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>

