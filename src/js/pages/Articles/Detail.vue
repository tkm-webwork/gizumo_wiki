<template lang="html">
  <section class="article-detail">
    <app-heading :level="1">記事詳細（プレビュー）</app-heading>
    <p>更新ボタン</p>
    <p>削除ボタン</p>
    <article class="article-detail__markdown">
      <app-markdown-view
        :markdown-content="markdownContent"
        wide
        white-bg
        flex
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

<style lang="css" scoped>
.article-detail {
  &__markdown {
    display: flex;
    align-items: flex-start;
  }
  &__index {
    margin-left: 5%;
    width: 30%;
    height: 300px;
    background-color: #fff;
  }
}
</style>
