<template lang="html">
  <section class="article-detail">
    <app-heading :level="1">記事詳細（プレビュー）</app-heading>
    <p>更新ボタン</p>
    <p>プレビューボタン</p>
    <p>削除ボタン</p>
    <article class="article-detail-markdown">
      <app-markdown-view
        :markdown-content="markdownContent"
        white-bg
      />
    </article>
  </section>
</template>

<script>
import { Heading } from '@Components/atoms';
import { MarkdownView } from '@Components/molecules';

export default {
  components: {
    appHeading: Heading,
    appMarkdownView: MarkdownView,
  },
  computed: {
    markdownContent() {
      const { title, content } = this.$store.state.articles.targetArticle;
      return `# ${title}\n${content}`;
    },
  },
  created() {
    this.$store.dispatch('getArticle', parseInt(this.$route.params.id, 10));
  },
};
</script>

<style lang="scss" scoped>
</style>
