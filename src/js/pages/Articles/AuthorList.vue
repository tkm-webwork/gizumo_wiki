<template>
  <app-article-author-list
    :article-list="articleList"
  />
</template>

<script>
import { ArticleAuthorList } from '@Components/molecules';

export default {
  components: {
    appArticleAuthorList: ArticleAuthorList,
  },
  computed: {
    articleList() {
      console.log(this.$store.state.articles.articleList);
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticles');
  },
};
</script>

<style scoped>

</style>
