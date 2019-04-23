<template lang="html">
  <div>
    <component
      :is="tag"
      :class="defaultClass"
    >
      {{ text }}
    </component>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'タイトル',
    },
    level: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    tag() {
      return `h${this.level}`;
    },
    defaultClass() {
      switch (this.level) {
        case 1:
          return 'heading-primary';
        case 2:
          return 'heading-secondary';
        case 3:
          return 'heading-tertiary';
        case 4:
          return 'heading-quaternary';
        case 5:
          return 'heading-quinary';
        case 6:
          return 'heading-senary';
        default:
          return 'invalid-level';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.heading-primary {
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 24px;
  border-left: 5px solid $keycolor;
  background-color: #fff;
}
.heading-secondary {}
.heading-tertiary {}
.heading-quaternary {}
.heading-quinary {}
.heading-senary {}
</style>
