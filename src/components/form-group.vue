<template>
  <fieldset class="form-group" :class="{ compressed }">
    <legend>{{ legend }}</legend>
    <div class="form-group-wrapper">
      <slot />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FormGroup',
  props: {
    legend: {
      type: String,
      required: true,
    },
    compressed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.form-group {
  margin: rem(35) rem(16);

  legend {
    color: var(--label-color-secondary);
    font-size: rem(14);
    padding: 0 rem(16) rem(8);
    text-transform: uppercase;
  }

  &.compressed {
    legend {
      @include hide();
    }
  }
}

.form-group-wrapper {
  background-color: var(--fill-color-quaternary);
  padding-left: rem(16);
  border-radius: 10px;

  .input-text:not(:last-of-type) {
    border-bottom: 1px solid var(--separator-color-opaque);
  }

  .input-text {
    input {
      padding-left: 0;
    }
  }
}
</style>