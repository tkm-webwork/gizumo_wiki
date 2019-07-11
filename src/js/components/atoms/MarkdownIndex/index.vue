<template v-if="flex">
  <div v-if="existsMarkdownIndexes">
    <div class="markdown-index">
      <p class="markdown-index-title">目次</p>
      <template
        v-for="index in markdownIndexes"
      >
        <a
          :key="index.val"
          :class="`markdown-index__anchor is-article-title-${index.tagName}`"
          @click.prevent="handleScroll(index.scrollToY)"
        >
          {{ index.title }}
        </a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    markdownIndexes: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    classes() {
      return {
        'markdown-view__body': true,
        'markdown-view__body--wide': this.wide,
        'markdown-view__body--white-bg': this.whiteBg,
      };
    },
    existsMarkdownIndexes() {
      const isExsits = this.markdownIndexes.length > 0;
      return isExsits;
    },
  },
  methods: {
    handleScroll(scrollToY, duration = 500) {
      this.$SmoothScroll(scrollToY, duration);
    },
  },
};
</script>

<style lang="postcss" scoped>

/* markdown-view__index */
.markdown-index {
  background: var(--white);
  padding: 16px;
}

.markdown-index-title {
  font-size: 16px;
  color: var(--themeColor);
  font-weight: bold;
  border-bottom: 1px solid var(--themeColor);
  padding-left: 16px;
  margin-bottom: 16px;
}

.markdown-index__anchor {
  display: block;
  cursor: pointer;
  @mixin hoverOpacity;
  &.is-article-title-h1 {
    font-size: 20px;
    font-weight: bold;
  }
  &.is-article-title-h2 {
    font-size: 14px;
    position: relative;
    padding-left: 16px;
    margin-left: 16px;
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 10px;
      height: 2px;
      background-color: var(--themeColor);
      top: calc(50% - 2px);
      left: 0;
    }
  }
}
</style>
