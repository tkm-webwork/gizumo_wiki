<template lang="html">
  <div
    :class="classes"
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
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'markdown-view': true,
        'markdown-view--white-bg': this.whiteBg,
      };
    },
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
.markdown-view--white-bg {
  background-color: #fff;
}

// マークダウンの中身のスタイル

</style>
