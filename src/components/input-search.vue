<template>
  <div class="input-search">
    <label :for="id">
      <span>{{ label }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M4.18,10.49a6.39,6.39,0,1,1,11.46,3.87l3.91,3.92a.9.9,0,0,1,.27.66.92.92,0,0,1-.93.95,1,1,0,0,1-.68-.27l-3.93-3.94a6.38,6.38,0,0,1-10.1-5.19Zm11.39,0a5,5,0,1,0-5,5A5,5,0,0,0,15.57,10.49Z"
        />
      </svg>
    </label>
    <input :id="id" v-model="value" type="search" v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  name: 'InputSearch',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      id: this.id || Math.ceil(Math.random() * 100),
    };
  },
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
.input-search {
  align-items: center;
  background-color: var(--fill-color-tertiary);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 rem(16) 0 0;
  position: relative;
  height: rem(36);
  color: var(--label-color-secondary);

  label {
    flex: 0 0 auto;
    padding: 0 rem(2) 0 rem(4);
    height: rem(24);

    span {
      @include hide();
    }

    svg {
      height: rem(24);
      width: rem(24);
    }
  }

  input {
    background: none;
    padding: 0;
    border: 0;
    height: rem(22);
    width: 100%;
    -webkit-appearance: none;
  }

  // label {
  //   color: var(--label-color-secondary);
  // }

  // input {
  //   position: absolute;
  //   left: 0;
  //   width: 100%;
  //   top: 0;
  //   height: 100%;
  //   padding: 0 rem( 16 );
  //   opacity: 0;
  // }
}
</style>
