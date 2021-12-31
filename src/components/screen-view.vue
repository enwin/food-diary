<template>
  <transition appear :name="transitionName" @after-leave="handleLeave">
    <component
      :is="component"
      v-if="!close"
      class="screen"
      :class="classNames"
      :aria-hidden="disabled || null"
      :inert="disabled || null"
      tabindex="-1"
    />
  </transition>
</template>

<script>
export default {
  name: 'ScreenView',
  props: {
    close: {
      type: Boolean,
      default: false,
    },
    component: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  computed: {
    classNames() {
      const classes = [];

      if (this.disabled) {
        classes.push(`${this.disabledMode}-leave`);
      }

      if (this.meta.mode) {
        classes.push(`mode-${this.meta.mode}`);
      }

      return classes;
    },
    currentViewIndex() {
      return this.$route.matched.length - 1;
    },
    disabled() {
      return this.index !== this.currentViewIndex || false;
    },
    disabledMode() {
      if (!this.disabled) {
        return undefined;
      }

      const { children } = this.$route.matched[this.index];
      const nextView = this.$route.matched[this.index + 1];

      if (children.some((child) => child.name === nextView.name)) {
        if (this.meta.mode === nextView.meta.mode) {
          return 'slide';
        }

        return nextView.meta.mode;
      }

      return undefined;
    },
    transitionName() {
      const previousView = this.$route.matched[this.index - 1];

      if (!previousView) {
        return undefined;
      }

      if (previousView.children.some((child) => child.name === this.name)) {
        if (previousView.meta.mode === this.meta.mode) {
          return 'slide';
        }

        return this.meta.mode;
      }

      return this.meta.mode;
    },
  },
  methods: {
    handleLeave() {
      this.$emit('close', this.name, this.index);
    },
  },
};
</script>

<style lang="scss">
.screen {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  outline: none;
  padding-top: env(safe-area-inset-top);
  position: relative;
  transform-origin: 50% 0;
  transition: all $duration $easing;
  z-index: 1;

  &[aria-hidden].overlay-leave {
    background-color: var(--background-color-inert);
    border-radius: 10px 10px 0 0;
    height: 100vh;
    overflow: hidden;
    top: 0;
    transform: translateY(#{rem(44)}) scale(var(--inertScale));
  }

  &.mode-overlay {
    background-color: var(--background-elevated);
    border-radius: 10px 10px 0 0;
    height: calc(100vh - #{rem(54)});
    left: 0;
    position: fixed;
    width: 100%;
    // z-index: 1;

    &:not([disabled]) {
      top: rem(54);
    }
  }

  &.overlay-enter-active,
  &.overlay-leave-active {
    transition: transform $duration $easing;
  }

  &.overlay-enter-from,
  &.overlay-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  &.slide-enter-active,
  &.slide-leave-active {
    transition: transform $duration $easing;
  }

  &.slide-enter-from,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
}
</style>

