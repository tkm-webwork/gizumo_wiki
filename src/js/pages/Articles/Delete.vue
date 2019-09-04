<template lang="html">
  <div>
    <app-article-delete
      :target-array="deletedArticleList"
     />
  </div>
</template>

<script>
import { ArticleDelete } from '@Components/molecules';

export default {
  components: {
    appArticleDelete: ArticleDelete,
  },
  computed: {
    deletedArticleList() {
      return this.$store.state.articles.deletedArticleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getAllDeletedArticles');
  },
};
</script>

<style lang="postcss" scoped>

</style>
