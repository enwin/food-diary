<template>
  <router-link :to="to" class="input-link">
    <span class="input-link-label">{{ label }}</span>
    <span class="input-link-value">
      {{ labelValue }}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 44">
        <path
          d="M9.31 22a1.12 1.12 0 00.36.84l8.56 8.31a1.16 1.16 0 002-.81 1.24 1.24 0 00-.33-.83L12.14 22l7.74-7.53a1.2 1.2 0 00.33-.83A1.14 1.14 0 0019 12.5a1.17 1.17 0 00-.82.34l-8.51 8.31a1.18 1.18 0 00-.36.85z"
        />
      </svg>
    </span>
  </router-link>
  <input v-model="value" type="hidden" v-bind="$attrs" />
</template>

<script>
export default {
  name: 'InputLink',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    labelValue: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    to: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
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
.input-link {
  align-items: center;
  display: flex;
  height: rem(45);
  justify-content: space-between;
  padding: 0 rem(16);
  text-decoration: none;
  vertical-align: middle;
}

.input-link-value {
  color: var(--label-color-secondary);
  padding-right: rem(24);
  position: relative;

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) scale(-1);
    width: rem(18);
  }
}
</style>