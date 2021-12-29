<template>
  <screen-view
    v-for="view in views"
    :key="view.name"
    v-bind="view"
    @close="handleClose"
  />
</template>

<script>
import screenView from './components/screen-view.vue';
import { markRaw } from 'vue';

export default {
  name: 'App',
  components: {
    screenView,
  },
  data() {
    return {
      views: [],
    };
  },
  watch: {
    ['$route.matched'](matched) {
      matched.forEach((route, index) => {
        const { components, name, meta } = route;

        const data = {
          component: markRaw(components.default),
          index,
          meta,
          name,
        };

        if (!this.views[index]) {
          this.views.push(data);
        }
      });

      const max = matched.length;

      if (this.views.length > max) {
        this.views[max] = {
          ...this.views[max],
          close: true,
        };

        this.views.splice(max + 1);
      }
    },
  },
  mounted() {
    document.documentElement.style.setProperty(
      '--inertScale',
      (window.innerWidth - 32) / window.innerWidth
    );

    // this.disableScroll();
  },
  methods: {
    // disableScroll() {
    //   let touchPos = undefined;
    //   window.addEventListener('touchstart', (event) => {
    //     touchPos = event.targetTouches[0].screenY;
    //   });
    //   window.addEventListener('touchend', () => {
    //     touchPos = undefined;
    //   });
    //   window.addEventListener(
    //     'touchmove',
    //     (event) => {
    //       const scrollingContent = event.target.closest(
    //         '.screen-wrapper, .screen > .content'
    //       );
    //       let prevent = true;
    //       if (scrollingContent) {
    //         const dirUp = event.targetTouches[0].screenY > touchPos;
    //         prevent =
    //           (dirUp && scrollingContent.scrollTop === 0) ||
    //           (!dirUp &&
    //             scrollingContent.clientHeight + scrollingContent.scrollTop ===
    //               scrollingContent.scrollHeight);
    //       }
    //       if (prevent) {
    //         event.preventDefault();
    //       }
    //     },
    //     { passive: false }
    //   );
    // },
    handleClose(name, index) {
      this.views.splice(index);
    },
  },
};
</script>

<style lang="scss">
@import '/src/styles/reset';
@import '/src/styles/variables';

:root {
  font-size: $root-size * 1px;
}

body {
  font-size: 1rem;
}

body {
  background-color: var(--background-color);
  color: var(--color);
  font: -apple-system-body;
  font-family: Helvetica, sans-serif;
  transition: background-color 0s cubic-bezier(0.25, 0.1, 0.25, 1) 0.3s;
  width: 100%;

  &[style*='background'] {
    transition-delay: 0s;
  }
}

#app {
  min-height: 100%;
}
</style>

