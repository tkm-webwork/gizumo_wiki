<template lang="html">
  <p :class="classes"><slot /></p>
</template>

<script>
export default {
  props: {
    exLarge: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        text: true,
        'text--error': this.error,
        'text--ex-large': this.exLarge,
      };
    },
  },
};
</script>

<style lang="css" scoped>
/* Defaultスタイル */
.text {
  font-size: 16px;
  &--ex-large {
    font-size: 24px;
  }
}
</style>
