<template>
  <header class="navigation-bar" :class="{ large, lifted }">
    <div class="controls">
      <div class="controls-left">
        <slot name="left" />
      </div>
      <div class="controls-right">
        <slot name="right" />
      </div>
    </div>
    <h1 class="title">
      <slot name="title" />
    </h1>
    <form v-if="search" action @submit.prevent="submit">
      <input-search v-model="query" v-bind="searchProps" placeholder="Search" />
    </form>
  </header>
</template>
<script>
import InputSearch from './input-search.vue';

export default {
  name: 'NavigationBar',
  components: {
    InputSearch,
  },
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    lifted: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Object,
      default: undefined,
    },
  },
  emits: ['search'],
  data() {
    return {
      query: (this.search && this.search.query) || '',
    };
  },
  computed: {
    searchProps() {
      const { query, ...data } = this.search;

      return data;
    },
  },
  methods: {
    submit() {
      document.activeElement.blur();
      this.$emit('search', this.query);
    },
  },
};
</script>
<style lang="scss">
$top: rem(6);

.navigation-bar {
  border-radius: 10px 10px 0 0;
  font-size: rem(17);
  line-height: div(22, 17);
  overflow: hidden;
  padding-bottom: 1px;
  padding-top: $top;
  position: relative;

  .controls {
    color: var(--blue);
    display: flex;
    padding: 0 rem(10);

    .controls-left {
      margin-right: auto;

      .icon-button {
        margin-left: rem(-11);
      }
    }

    .controls-right {
      margin-left: auto;

      .icon-button {
        margin-right: rem(-11);
      }

      .text {
        font-weight: bold;
      }
    }
  }

  .title {
    font-weight: bold;
    text-transform: capitalize;
  }

  &:not(.large) {
    background-color: var(--material-background-chrome);
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);

    .title {
      left: 50%;
      padding: rem(11) rem(44);
      position: absolute;
      text-align: center;
      top: $top;
      transform: translateX(-50%);
    }

    &::after {
      background-color: var(--separator-color-non-opaque);
      bottom: 0;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 1;
    }
  }

  &.large {
    .title {
      font-size: em(34, 17);
      line-height: div(41, 34);
      letter-spacing: 0.36px;
      padding: rem(3) rem(14) 0;
    }
  }

  &.lifted {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  // button {
  //   padding: 0;
  //   background: none;
  //   border: 0;
  //   min-width: rem(44);
  //   height: rem(44);
  // }

  .input-search {
    margin: rem(4) rem(16) rem(15);
  }
}
</style>
