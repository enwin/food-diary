<template>
  <main id="home" class="screen" :disabled="disabled" :class="classNames">
    <navigation-bar>
      <template #right>
        <cta-icon label="Add" :to="{ name: 'AddScreen' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
            <path
              d="M21.19,30.15V22.82H14.08a.84.84,0,0,1-.82-.82.83.83,0,0,1,.82-.81h7.11V13.85a.81.81,0,0,1,1.62,0v7.34h7.11a.83.83,0,0,1,.82.81.84.84,0,0,1-.82.82H22.81v7.33a.81.81,0,0,1-1.62,0Z"
            />
          </svg>
        </cta-icon>
      </template>
    </navigation-bar>
  </main>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import ScreenBase from '../components/screen.vue';
import CtaIcon from '../components/cta-icon.vue';
import NavigationBar from '../components/navigation-bar.vue';

export default {
  name: 'HomePage',
  components: {
    CtaIcon,
    NavigationBar,
  },
  extends: ScreenBase,
  computed: {
    classNames() {
      const classes = [];

      if (this.mode) {
        classes.push(this.mode);
      }

      return classes;
    },
  },
};
</script>