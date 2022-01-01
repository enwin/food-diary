<template>
  <main id="home">
    <navigation-bar>
      <template #right>
        <cta-icon label="Add" :to="{ name: 'Add' }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
            <path
              d="M21.19,30.15V22.82H14.08a.84.84,0,0,1-.82-.82.83.83,0,0,1,.82-.81h7.11V13.85a.81.81,0,0,1,1.62,0v7.34h7.11a.83.83,0,0,1,.82.81.84.84,0,0,1-.82.82H22.81v7.33a.81.81,0,0,1-1.62,0Z"
            />
          </svg>
        </cta-icon>
      </template>
    </navigation-bar>

    <div class="content">
      <ul>
        <li v-for="meal in meals" :key="meal.name">{{ meal.name }}</li>
      </ul>
    </div>
  </main>
</template>
<script>
import CtaIcon from '../components/cta-icon.vue';
import NavigationBar from '../components/navigation-bar.vue';
import { userStore } from '../store/user';
import { mealsStore } from '../store/meals';
import { mapState } from 'pinia';

export default {
  name: 'HomePage',
  components: {
    CtaIcon,
    NavigationBar,
  },
  computed: {
    ...mapState(userStore, ['access_token', 'account_id']),
    ...mapState(mealsStore, ['meals']),
  },
  created() {
    if (!this.access_token) {
      this.$router.replace({ name: 'Login' });
    }
  },
};
</script>
