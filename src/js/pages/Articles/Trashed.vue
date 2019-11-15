<template lang="html">
  <div>
    <app-article-trashed
      :title="title"
      :target-array="articlesList"
      :access="access"
      border-gray
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
      title: 'すべて',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('articles/getDeletedArticles');
  },
};
</script>
