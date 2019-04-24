<template lang="html">
  <component
    :is="tag"
    :class="[className || defaultClass]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    tag() {
      return `h${this.level}`;
    },
    defaultClass() {
      switch (this.level) {
        case 1:
          return 'heading--primary';
        case 2:
          return 'heading--secondary';
        case 3:
          return 'heading--tertiary';
        case 4:
          return 'heading--quaternary';
        case 5:
          return 'heading--quinary';
        case 6:
          return 'heading--senary';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// Defaultスタイル
.heading--primary {
  padding: 5px;
  padding-left: 15px;
  font-size: 24px;
  border-left: 5px solid $keycolor;
  background-color: #fff;
}
.heading--secondary {}
.heading--tertiary {}
.heading--quaternary {}
.heading--quinary {}
.heading--senary {}

// Unique（For Props）スタイル
.header__title {
  font-size: 20px;
  color: #fff;
}
</style>
