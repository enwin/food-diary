<template>
  <svg
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    class="activity-indicator"
    :class="classNames"
  >
    <g fill="#80858E" fill-rule="evenodd">
      <template v-if="size === 'small'">
        <rect
          fill-opacity=".7"
          transform="rotate(90 3.5 11)"
          x="2"
          y="7.5"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect
          fill-opacity=".9"
          transform="rotate(-45 5.697 5.697)"
          x="4.197"
          y="2.197"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect fill-opacity=".4" x="9.5" y="15" width="3" height="7" rx="1.5" />
        <rect
          fill-opacity=".6"
          transform="rotate(45 5.697 16.303)"
          x="4.197"
          y="12.803"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect
          fill-opacity=".3"
          transform="rotate(-45 16.303 16.303)"
          x="14.803"
          y="12.803"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect
          fill-opacity=".2"
          transform="rotate(90 18.5 11)"
          x="17"
          y="7.5"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect
          fill-opacity=".1"
          transform="rotate(45 16.303 5.697)"
          x="14.803"
          y="2.197"
          width="3"
          height="7"
          rx="1.5"
        />
        <rect x="9.5" width="3" height="7" rx="1.5" />
      </template>
      <template v-else>
        <rect
          fill-opacity=".9"
          transform="rotate(-45 7.929 7.929)"
          x="5.929"
          y="2.929"
          width="4"
          height="10"
          rx="2"
        />
        <rect
          fill-opacity=".7"
          transform="rotate(90 5 15)"
          x="3"
          y="10"
          width="4"
          height="10"
          rx="2"
        />
        <rect
          fill-opacity=".6"
          transform="rotate(45 7.929 22.071)"
          x="5.929"
          y="17.071"
          width="4"
          height="10"
          rx="2"
        />
        <rect fill-opacity=".4" x="13" y="20" width="4" height="10" rx="2" />
        <rect
          fill-opacity=".3"
          transform="rotate(-45 22.071 22.071)"
          x="20.071"
          y="17.071"
          width="4"
          height="10"
          rx="2"
        />
        <rect
          fill-opacity=".2"
          transform="rotate(90 25 15)"
          x="23"
          y="10"
          width="4"
          height="10"
          rx="2"
        />
        <rect
          fill-opacity=".1"
          transform="rotate(45 22.071 7.929)"
          x="20.071"
          y="2.929"
          width="4"
          height="10"
          rx="2"
        />
        <rect x="13" width="4" height="10" rx="2" />
      </template>
    </g>
  </svg>
</template>

<script>
const sizes = ['small', 'large'];

export default {
  name: 'ActivityIndicator',
  props: {
    size: {
      type: String,
      default: 'small',
      validator(value) {
        return sizes.includes(value);
      },
    },
  },
  computed: {
    classNames() {
      return [`size-${this.size}`];
    },
    viewBox() {
      const viewBox = [0, 0];

      if (this.size === 'small') {
        viewBox.push(22, 22);
      } else {
        viewBox.push(30, 30);
      }

      return viewBox.join(' ');
    },
  },
};
</script>

<style lang="scss">
@keyframes loop {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.activity-indicator {
  animation: loop 0.9s steps(8, jump-start) infinite;

  &.size-small {
    height: rem(22);
    width: rem(22);
  }
  &.size-large {
    height: rem(30);
    width: rem(30);
  }
}
</style>