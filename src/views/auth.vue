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