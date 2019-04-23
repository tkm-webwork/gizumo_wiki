<template lang="html">
  <div
    class="markdown-view"
    v-html="marked"
  />
</template>

<script>
import marked from 'marked';

export default {
  props: {
    markdownContent: {
      type: String,
      default: '',
    },
  },
  computed: {
    marked() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.markdownContent);
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-view {
  padding: 10px;
}
</style>
