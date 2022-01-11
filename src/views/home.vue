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

    <div ref="content" class="content">
      <section v-for="entry in list" :key="entry.key" class="table-list">
        <h1 :ref="setTitles" class="table-list-header">
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
      titleClasses: [],
      today: new Date().toISOString().split('T')[0],
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
  mounted() {
    this.setObserver();
    this.setClasses();
  },
  beforeUpdate() {
    if (this.observer) {
      this.titleRefs.forEach((el) => {
        this.observer.unobserve(el);
      });
    }
    this.titleRefs = [];
    this.titleClasses = [];
  },
  methods: {
    intersects(entries, observer) {
      entries.forEach(({ target, intersectionRatio }) => {
        target.classList.toggle('sticky', intersectionRatio < 1);
      });
    },
    setTitles(el) {
      if (el) {
        this.titleRefs.push(el);
        this.observer.observe(el);
        this.titleClasses.push('');
      }
    },
    setClasses() {
      this.titleClasses = this.list.map(({ key }) => {
        const classes = [];

        if (key === this.today) {
          classes.push('current');
        }

        return classes.join(' ');
      });
    },
    setObserver() {
      if (!this.observer) {
        this.observer = new IntersectionObserver(this.intersects, {
          root: this.$refs.content,
          rootMargin: '-1px 0px 0px 0px',
          threshold: [1],
        });
        window.titleObserver = this.observer;
      }
    },
  },
};
</script>

<style lang="scss">
#home {
  height: 100vh;

  .navigation-bar {
    background-color: var(--fill-color-quaternary);
    flex-shrink: 0;

    .title {
      visibility: hidden;
    }
  }

  .content {
    overflow: auto;
  }
}
.table-list-header {
  backdrop-filter: blur(40px);
  background-color: var(--background-color);
  font: -apple-system-headline;
  @include title-level(11, 22);
  margin-bottom: 1px;
  padding: 0 rem(16) 1px;
  position: sticky;
  text-transform: uppercase;
  top: 0;
  z-index: 1;

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