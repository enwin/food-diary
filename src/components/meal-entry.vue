<template>
  <router-link v-slot="{ href, navigate }" custom :to="link">
    <component
      :is="tag"
      class="meal-entry"
      :class="classNames"
      @click="navigate"
    >
      <div>
        <p class="meal-entry-title">{{ name }}</p>
        <p class="meal-entry-type">{{ mealLabel }}</p>
      </div>
      <p class="meal-entry-effect">{{ effectLabel }}</p>
      <a :href="href">View meal</a>
    </component>
  </router-link>
</template>

<script>
import { mealTypes, effectTypes } from '../config/meals';

export default {
  name: 'MealEntry',
  props: {
    tag: {
      type: String,
      default: 'li',
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    effect: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    classNames() {
      const classes = [`effect-${this.effect}`];

      return classes;
    },
    effectLabel() {
      return effectTypes[this.effect];
    },
    link() {
      return {
        name: 'View',
        params: {
          id: this.id,
        },
      };
    },
    mealLabel() {
      return mealTypes[this.effect];
    },
  },
};
</script>

<style lang="scss">
.meal-entry {
  display: flex;
  padding: rem(8) rem(16);

  &::before {
    content: '';
    width: 4px;
    border-radius: 2px;
    margin: rem(3) 0;
    margin-right: rem(8);
  }

  &.effect-0::before {
    background-color: var(--color-green);
  }
  &.effect-1::before {
    background-color: var(--color-yellow);
  }
  &.effect-2::before {
    background-color: var(--color-orange);
  }
  &.effect-3::before {
    background-color: var(--color-red);
  }

  div {
    overflow: hidden;
    width: 100%;
    padding-right: rem(8);
  }

  p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  a {
    @include hide();
  }
}

.meal-entry-title {
  font: -apple-system-headline;
  @include title-level(15, 20);
}

.meal-entry-type {
  color: var(--label-color-secondary);
  @include title-level(13, 18);
}

.meal-entry-effect {
  flex-shrink: 0;
  @include title-level(14, 19);
}
</style>