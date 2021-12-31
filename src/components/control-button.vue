<template>
  <component
    :is="node"
    class="navigation-button"
    :class="classes"
    v-bind="attributes"
  >
    <svg
      v-if="direction"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 44"
    >
      <path
        d="M9.31 22a1.12 1.12 0 00.36.84l8.56 8.31a1.16 1.16 0 002-.81 1.24 1.24 0 00-.33-.83L12.14 22l7.74-7.53a1.2 1.2 0 00.33-.83A1.14 1.14 0 0019 12.5a1.17 1.17 0 00-.82.34l-8.51 8.31a1.18 1.18 0 00-.36.85z"
      />
    </svg>
    <span>
      <slot name="default" />
    </span>
  </component>
</template>
<script>
const directions = ['', 'backward', 'forward'];

export default {
  name: 'ControlButton',
  props: {
    direction: {
      type: String,
      default: '',
      validate(value) {
        return directions.includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    external: {
      type: Boolean,
      default: false,
    },
    link: {
      type: [String, Object],
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    attributes() {
      let attributes;

      if (!this.link) {
        attributes = {
          type: this.type,
        };

        if (this.disabled) {
          attributes.disabled = true;
        }
      } else if (!this.disabled) {
        if (this.external) {
          attributes = {
            href: this.link,
            target: '_blank',
            rel: 'noreferrer noopener',
          };
        } else {
          attributes = {
            to: {
              ...this.link,
              replace: true,
            },
          };
        }
      }

      return attributes;
    },
    classes() {
      const classes = [];

      if (this.direction) {
        classes.push(`direction-${this.direction}`);
      }

      return classes;
    },
    node() {
      if (this.link) {
        if (this.external || this.disabled) {
          return 'a';
        }

        return 'router-link';
      }

      return 'button';
    },
  },
};
</script>
<style lang="scss">
.navigation-button {
  align-items: center;
  background: none;
  border: 0;
  border-radius: 5px;
  color: var(--color-accent);
  display: flex;
  font-size: rem(16);
  font: -apple-system-headline;
  height: rem(44);
  line-height: div(22, 15);
  padding: 0 rem(6);
  position: relative;
  text-decoration: none;

  &:hover,
  &:active {
    color: var(--color-accent);
  }

  svg {
    position: absolute;
    height: rem(44);
    top: 50%;
    transform: translateY(-50%);
  }

  &.direction-forward {
    padding-right: rem(20);

    svg {
      right: rem(-9);
      transform: translateY(-50%) scale(-1, 1);
    }
  }

  &.direction-backward {
    padding-left: rem(20);

    svg {
      left: rem(-9);
    }
  }
}

button.navigation-button[disabled],
a.navigation-button:not([href]) {
  color: var(--label-color-tertiary);
}
</style>
