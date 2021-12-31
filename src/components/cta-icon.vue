<template>
  <component :is="node" class="cta-icon" v-bind="attributes">
    <span>{{ label }}</span>
    <slot />
  </component>
</template>

<script>
export default {
  name: 'CtaIcon',
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    attributes() {
      if (this.to) {
        return {
          to: this.to,
        };
      }

      return undefined;
    },
    node() {
      if (this.to) {
        return 'router-link';
      }

      return 'button';
    },
  },
};
</script>

<style lang="scss">
.cta-icon {
  border-radius: 5px;
  height: rem(44);
  width: rem(44);

  span {
    @include hide();
  }

  svg {
    aspect-ratio: 1/1;
  }
}

a.cta-icon {
  display: flex;
}
</style>