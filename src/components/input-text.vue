<template>
  <div
    class="input-text"
    :class="classNames"
    @focusin="handleFocus"
    @focusout="handleFocus"
  >
    <label :for="id">{{ label }}</label>
    <input :id="id" ref="input" v-model="value" type="text" v-bind="$attrs" />
    <transition>
      <button
        v-if="filled && focussed"
        type="button"
        class="input-text-reset"
        @click="reset"
      >
        <span>Clear field {{ label }}</span>
        <svg viewBox="0 0 78 78">
          <path
            d="M39.108 77.418c5.317 0 10.305-1.004 14.966-3.011a39.104 39.104 0 0 0 12.337-8.374 39.78 39.78 0 0 0 8.382-12.354c2.024-4.66 3.035-9.638 3.035-14.933s-1.011-10.273-3.035-14.933a39.642 39.642 0 0 0-8.398-12.354A39.298 39.298 0 0 0 54.04 3.085c-4.66-2.007-9.649-3.01-14.966-3.01-5.284 0-10.26 1.003-14.925 3.01a38.79 38.79 0 0 0-12.32 8.374A39.99 39.99 0 0 0 3.47 23.813C1.448 28.473.436 33.45.436 38.746S1.448 49.02 3.47 53.68a39.85 39.85 0 0 0 8.374 12.354 38.982 38.982 0 0 0 12.338 8.374c4.665 2.007 9.64 3.011 14.925 3.011ZM26.25 54.485c-.77 0-1.43-.277-1.978-.83a2.742 2.742 0 0 1-.822-2.002c0-.77.277-1.432.83-1.986l10.873-10.872L24.28 27.922a2.71 2.71 0 0 1-.83-1.985c0-.781.274-1.435.822-1.961a2.753 2.753 0 0 1 1.978-.79c.738 0 1.389.266 1.953.798l10.905 10.888 10.986-10.92c.553-.565 1.205-.847 1.953-.847.792 0 1.462.271 2.01.814a2.65 2.65 0 0 1 .822 1.953c0 .792-.287 1.465-.862 2.018L43.112 38.795l10.872 10.84c.575.531.863 1.204.863 2.018 0 .781-.28 1.449-.839 2.002a2.774 2.774 0 0 1-2.026.83c-.814 0-1.486-.282-2.018-.846L39.108 42.75 28.3 53.639a2.793 2.793 0 0 1-2.05.846Z"
          />
        </svg>
      </button>
    </transition>
  </div>
</template>
<script>
const inputModes = ['label', 'placeholder'];

export default {
  name: 'InputText',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'label',
      validator(value) {
        return inputModes.includes(value);
      },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      focussed: false,
      id: this.id || Math.ceil(Math.random() * 100),
    };
  },
  computed: {
    classNames() {
      const classes = [`variant-${this.variant}`];

      if (this.filled) {
        classes.push('filled');
      }

      if (this.focussed) {
        classes.push('focussed');
      }

      return classes;
    },
    filled() {
      return Boolean(this.value);
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    handleFocus(event) {
      const focussed = event.type === 'focusin';

      window.clearTimeout(this.focusTimeout);

      this.focusTimeout = window.setTimeout(
        () => {
          this.focussed = focussed;
        },
        focussed ? 0 : 50
      );
    },
    reset() {
      this.value = '';
      this.$refs.input.focus();
    },
  },
};
</script>
<style lang="scss">
$height: rem(45);

.input-text {
  --color-placeholder: var(--label-color-tertiary);
  align-items: center;
  display: flex;
  font-size: rem(14);
  height: $height;
  justify-content: space-between;
  line-height: div(19, 14);
  padding-left: rem(16);
  padding-top: rem(1);
  position: relative;

  input {
    background: none;
    border: 0;
    caret-color: var(--color-theme);
    height: $height;
    padding-right: rem(16);
    width: 100%;

    &::placeholder {
      color: var(--color-placeholder);
    }
  }

  &.variant-label {
    label {
      flex: 0 0 auto;
      min-width: rem(100);
    }
  }

  &.variant-placeholder {
    label {
      color: var(--color-placeholder);
      line-height: $height;
      position: absolute;
      top: 0;
      pointer-events: none;
    }

    &.filled {
      label {
        opacity: 0;
      }
    }
  }

  &.focussed {
    input {
      padding-right: rem(44);
    }
  }

  &:not(.focussed) {
    input {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.input-text-reset {
  position: absolute;
  line-height: $height;
  right: 0;
  top: 0;
  width: rem(44);

  span {
    @include hide();
  }

  svg {
    color: var(--label-color-secondary);
    margin-right: rem(22);
    vertical-align: middle;
    width: rem(14);
  }
}
</style>
