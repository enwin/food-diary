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
        <p class="meal-entry-effect">{{ effectLabel }}</p>
      </div>
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
      return mealTypes[this.type];
    },
  },
};
</script>

<style lang="scss">
.meal-entry {
  padding: 0 rem(16);

  &.effect-0 div::before {
    background-color: var(--color-green);
  }
  &.effect-1 div::before {
    background-color: var(--color-yellow);
  }
  &.effect-2 div::before {
    background-color: var(--color-orange);
  }
  &.effect-3 div::before {
    background-color: var(--color-red);
  }

  &:not(:last-child) div {
    border-bottom: 1px solid var(--separator-color-opaque);
  }

  div {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-template-rows: 1fr 1fr;
    column-gap: rem(16);
    margin-left: rem(12);
    padding: rem(10) 0;

    position: relative;

    &::before {
      content: '';
      width: rem(4);
      border-radius: 2px;
      margin: rem(10 + 3) 0;
      position: absolute;

      inset: 0 0 0 rem(-12);
    }
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
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

.meal-entry-type {
  color: var(--label-color-secondary);
  @include title-level(13, 18);
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.meal-entry-effect {
  @include title-level(14, 19);
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
</style>