<template>
  <main id="home">
    <navigation-bar>
      <template #title>FoodDi</template>
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
      <section
        v-for="(entry, index) in list"
        :key="entry.key"
        class="table-list"
      >
        <h1
          :ref="setTitles"
          class="table-list-header"
          :class="titleClasses[index]"
        >
          {{ entry.day }}
        </h1>
        <ul>
          <meal-entry
            v-for="meal in entry.meals"
            :key="meal.id"
            v-bind="meal"
          />
        </ul>
      </section>
    </div>
  </main>
</template>
<script>
import CtaIcon from '../components/cta-icon.vue';
import MealEntry from '../components/meal-entry.vue';
import NavigationBar from '../components/navigation-bar.vue';
import { userStore } from '../store/user';
import { mealsStore } from '../store/meals';
import { mapState } from 'pinia';

export default {
  name: 'HomePage',
  components: {
    CtaIcon,
    MealEntry,
    NavigationBar,
  },
  data() {
    return {
      titleRefs: [],
      titleClasses: ['current sticky'],
    };
  },
  computed: {
    ...mapState(userStore, ['access_token', 'account_id']),
    ...mapState(mealsStore, ['list']),
  },
  created() {
    if (!this.access_token) {
      this.$router.replace({ name: 'Login' });
    }
  },
  beforeUpdate() {
    this.titleRefs = [];
  },
  methods: {
    setTitles(el) {
      if (el) {
        this.titleRefs.push(el);
      }
    },
  },
};
</script>

<style lang="scss">
#home {
  .navigation-bar {
    background-color: var(--fill-color-quaternary);

    .title {
      visibility: hidden;
    }
  }
}
.table-list-header {
  position: sticky;
  top: 0;
  font: -apple-system-headline;
  @include title-level(12, 22);
  padding: 0 rem(16) 1px;
  margin-bottom: 1px;
  text-transform: uppercase;

  &::after {
    content: '';
    display: block;
    margin-bottom: -2px;
    border-bottom: 1px solid var(--separator-color-opaque);
  }

  &.current {
    color: var(--color-theme);
  }

  &.sticky {
    background-color: var(--fill-color-quaternary);
  }
}
</style>