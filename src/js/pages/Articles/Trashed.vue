<template lang="html">
  <div>
    <app-article-trashed
      :title="title"
      :trashed-list="articleList"
    />
  </div>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      title: '削除済み記事',
    };
  },
  computed: {
    articleList() {
      return this.$store.state.articles.trashedArticleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getTrashedArticle');
  },
};
</script>
