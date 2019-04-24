<template lang="html">
  <p :class="classes"><slot /></p>
</template>

<script>
export default {
  props: {
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
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// Defaultスタイル
.text {
  font-size: 16px;
}

// Unique（For Props）スタイル
</style>
