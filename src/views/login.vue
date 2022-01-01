<template>
  <main id="login">
    <control-button variant="action-big" @click="dropbox"
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
  methods: {
    async dropbox() {
      const authUrl = await getAuthUrl();

      if (!authUrl) {
        return;
      }

      window.location.href = authUrl;
    },
  },
};
</script>

<style lang="scss">
#login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 rem(40);
}
</style>