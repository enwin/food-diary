<template>
  <component
    :is="node"
    class="control-button"
    :class="[variant]"
    v-bind="attributes"
  >
    <span>
      <slot name="default" />
    </span>
  </component>
</template>
<script>
export default {
  name: 'ControlButton',
  props: {
    external: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    link: {
      type: [String, Object],
      default: '',
    },
    variant: {
      type: String,
      default: 'action',
    },
  },
  computed: {
    attributes() {
      if (!this.link) {
        return {
          type: this.type,
        };
      }

      if (this.external) {
        return {
          href: this.link,
          target: '_blank',
          rel: 'noreferrer noopener',
        };
      }

      return {
        to: {
          ...this.link,
          replace: true,
        },
      };
    },
    node() {
      return this.link ? (this.external ? 'a' : 'router-link') : 'button';
    },
  },
};
</script>
<style lang="scss">
.control-button {
  align-items: center;
  background-color: var(--color-theme);
  border-radius: 8px;
  border-width: 0;
  color: var(--label-color-primary);
  display: inline-flex;
  font-size: rem(15);
  font-weight: bold;
  font: -apple-system-headline;
  justify-content: center;
  line-height: div(22, 15);
  padding: 0 rem(16);
  text-decoration: none;
  text-transform: uppercase;

  &.action {
    min-width: rem(72);
    height: rem(27);
  }

  &.action-big {
    height: rem(40);
    width: 100%;
    font-size: rem(13);
    line-height: div(18, 13);
  }
}

button.control-button:disabled {
  background: var(--fill-color-quaternary);
  color: var(--label-color-tertiary);
}
</style>
