<template>
  <main id="aut"></main>
</template>
<script>
import { userStore } from '../store/user';
import { mealsStore } from '../store/meals';

export default {
  name: 'AuthScreen',
  setup() {
    const user = userStore();
    const meals = mealsStore();

    return {
      user,
      meals,
    };
  },
  async created() {
    const dropboxQuery = new URLSearchParams(this.$route.hash.replace('#', ''));

    this.user.saveDropbox(Array.from(dropboxQuery.entries()));

    await this.meals.getData();

    this.$router.replace({ name: 'Home' });
  },
};
</script>

<style lang="scss">
#home {
  height: 100vh;

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 rem(40);
  }
}
</style>