<template lang="html">
  <component :is="tag" :class="classes"><slot /></component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'p',
    },
    inlineBlock: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    exSmall: {
      type: Boolean,
      default: false,
    },
    exLarge: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        text: true,
        'text--inline-block': this.inlineBlock,
        'text--error': this.error,
        'text--small': this.small,
        'text--ex-small': this.exSmall,
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
}

.text--inline-block {
  display: inline-block;
}
.text--error {
  color: var(--errorColor);
}
.text--ex-large {
  font-size: 24px;
}
.text--small {
  font-size: 14px;
}
.text--ex-small {
  font-size: 12px;
}

/* Unique（For Props）スタイル */

</style>
