<template lang="html">
  <app-article-trashed
    :deleted-article-list="deletedArticleList"
    :theads="theads"
  />
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      theads: ['作成日', 'タイトル', '内容'],
    };
  },
  computed: {
    deletedArticleList() {
      return this.$store.state.articles.deletedArticleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getDeletedArticle');
  },
};
</script>
