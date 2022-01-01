<template>
  <main id="login" :class="{ hide }">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 235.45 200"
      aria-hidden="true"
      class="login-logo"
    >
      <path
        style="fill: #0061ff"
        d="M58.86 0 0 37.5 58.86 75l58.87-37.5L58.86 0zM176.59 0l-58.86 37.5L176.59 75l58.86-37.5L176.59 0zM0 112.5 58.86 150l58.87-37.5L58.86 75 0 112.5zM176.59 75l-58.86 37.5 58.86 37.5 58.86-37.5L176.59 75zM58.86 162.5l58.87 37.5 58.86-37.5-58.86-37.5-58.87 37.5z"
      />
    </svg>
    <h1 class="login-title">Login to Dropbox</h1>

    <p class="login-description">
      The app use Dropbox to store the data. Login and allow the app to access
      your Dropbox account. The app will create it’s own folder and store all
      the data it needs there.
    </p>

    <control-button class="login-dropbox" variant="action-big" @click="dropbox"
      >Connect to Dropbox</control-button
    >
  </main>
</template>
<script>
import { getAuthUrl } from '../data/client';
import ControlButton from '../components/control-button.vue';

export default {
  name: 'LoginScreen',
  components: {
    ControlButton,
  },
  data() {
    return {
      hide: false,
    };
  },
  methods: {
    async dropbox() {
      const authUrl = await getAuthUrl();

      if (!authUrl) {
        return;
      }

      this.hide = true;

      window.location.href = authUrl;
    },
  },
};
</script>

<style lang="scss">
#login {
  height: 100vh;
  justify-content: center;
  padding: 0 rem(40);
  transition: none;

  &.hide {
    opacity: 0;
  }
}

.login-logo {
  width: rem(120);
  height: rem(102);
  margin-top: rem(div(-102, 2));
}

.login-title {
  font: -apple-system-headline;
  @include title-level(21, 26);
  margin: rem(16) 0;
}

.login-dropbox {
  margin-top: rem(32);
}
</style>