<template>
  <div class="input-date">
    <span class="input-date-label">{{ label }}</span>
    <span class="input-date-value">
      {{ labelValue }}
    </span>
    <input v-model="value" type="date" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: 'InputDate',
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
  },
  emits: ['update:modelValue'],
  computed: {
    labelValue() {
      return '';
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
    date() {
      return new Date(this.value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
};
</script>

<style lang="scss">
.input-date {
  align-items: center;
  border-radius: 10px;
  display: flex;
  font-size: rem(14);
  height: rem(45);
  justify-content: space-between;
  line-height: div(19, 14);
  padding-top: rem(1);
  padding: 0 rem(16);
  text-decoration: none;
  vertical-align: middle;

  input[type='date'] {
    background-color: var(--fill-color-quaternary);
    border-width: 0;
    color: var(--label-color-primary);
  }
}
</style>