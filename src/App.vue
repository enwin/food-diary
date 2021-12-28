<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: 'App',
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
  },
};
</script>

<style lang="scss">
@import '/src/styles/reset';
@import '/src/styles/variables';

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

