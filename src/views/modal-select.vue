<template>
  <main id="type">
    <navigation-bar>
      <template #title>{{ title }}</template>
      <template #left>
        <control-button direction="backward" @click="back">{{
          parentTitle
        }}</control-button>
      </template>
    </navigation-bar>
    <form>
      <radio-group
        v-model="value"
        legend="Type"
        compressed
        :values="values"
        name="type"
      />
    </form>
  </main>
</template>

<script>
import ControlButton from '../components/control-button.vue';
import NavigationBar from '../components/navigation-bar.vue';
import RadioGroup from '../components/radio-group.vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

export default {
  name: 'TypeScreen',
  components: {
    ControlButton,
    NavigationBar,
    RadioGroup,
  },
  props: {
    parentName: {
      type: String,
      required: true,
    },
    parentTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    valueKey: {
      type: String,
      required: true,
    },
    valuesKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const store = route.meta.store();

    const refs = storeToRefs(store);
    console.log(refs, props);
    return {
      value: refs[props.valueKey],
      values: refs[props.valuesKey],
    };
  },
  watch: {
    value() {
      this.back();
    },
  },
  methods: {
    back() {
      this.$router.replace({
        name: this.parentName,
      });
    },
  },
};
</script>