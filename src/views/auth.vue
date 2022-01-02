<template>
  <main id="auth">
    <p class="auth-loading">
      Fetching data from Dropbox…<activity-indicator />
    </p>
  </main>
</template>
<script>
import { userStore } from '../store/user';
import { mealsStore } from '../store/meals';
import ActivityIndicator from '../components/activity-indicator.vue';

export default {
  name: 'AuthScreen',
  components: {
    ActivityIndicator,
  },
  setup() {
    const user = userStore();
    const meals = mealsStore();

    return {
      user,
      meals,
    };
  },
  async created() {
    const routeHash = this.$route.hash.replace('#', '');

    if (routeHash) {
      const dropboxQuery = new URLSearchParams(routeHash);

      this.user.saveDropbox(Array.from(dropboxQuery.entries()));

      await this.meals.getData();
    }

    this.$router.replace({ name: 'Home' });
  },
};
</script>

<style lang="scss">
#auth {
  height: 100vh;
  justify-content: center;
  padding: 0 rem(40);
  transition: none;
}

.auth-loading {
  text-align: center;
  @include title-level(17, 22);
  color: var(--label-color-secondary);

  .activity-indicator {
    margin-left: rem(8);
  }
}
</style>