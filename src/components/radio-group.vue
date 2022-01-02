<template>
  <form-group class="radio-group" :legend="legend" :compressed="compressed">
    <ul>
      <li v-for="radio in radios" :key="radio.name" class="radio-group-radio">
        <input
          :id="radio.name"
          v-model="value"
          :value="radio.value"
          type="radio"
          :name="name"
        />
        <label :for="radio.name">{{ radio.label }}</label>
        <svg
          viewBox="0 0 68 67"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M26.174 66.121c1.889 0 3.386-.83 4.493-2.49L66.262 7.332c.424-.651.717-1.237.88-1.758.162-.52.243-1.041.243-1.562 0-1.205-.366-2.173-1.098-2.906C65.554.374 64.586.008 63.382.008c-.88 0-1.596.17-2.149.513-.553.341-1.107.935-1.66 1.782L25.979 56.209 8.303 32.381c-1.041-1.432-2.31-2.149-3.808-2.149-1.237 0-2.246.383-3.028 1.148-.78.765-1.171 1.766-1.171 3.003 0 .52.105 1.05.317 1.587.212.537.529 1.082.952 1.636l19.97 25.927c1.335 1.725 2.882 2.588 4.64 2.588Z"
          />
        </svg>
      </li>
    </ul>
  </form-group>
</template>

<script>
import FormGroup from './form-group.vue';

export default {
  name: 'RadioGroup',
  components: {
    FormGroup,
  },
  props: {
    legend: {
      type: String,
      required: true,
    },
    compressed: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    radios() {
      return this.values.map(({ label, value }) => {
        return {
          label,
          value: value.toString(),
          name: label.toLowerCase(),
        };
      });
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
};
</script>

<style lang="scss">
.radio-group {
  .form-group-wrapper {
    padding-left: 0;
  }
}
.radio-group-radio {
  display: flex;
  position: relative;

  &:not(:last-child) {
    label {
      border-bottom: 1px solid var(--separator-color-opaque);
    }
  }

  input[type='radio'] {
    appearance: none;
    position: absolute;

    &:checked {
      & ~ svg {
        display: block;
      }
    }
  }

  label {
    align-items: center;
    display: flex;
    font-size: rem(14);
    height: rem(45);
    line-height: div(19, 14);
    margin-left: rem(16);
    padding-right: rem(16);
    padding-top: rem(1);
    width: 100%;
  }

  svg {
    color: var(--color-accent);
    display: none;
    width: rem(14);
    position: absolute;
    right: rem(16);
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>