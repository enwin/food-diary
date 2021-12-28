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
  width: rem(44);
  border-radius: 5px;

  span {
    @include hide();
  }
}

a.cta-icon {
  display: flex;
}
</style>