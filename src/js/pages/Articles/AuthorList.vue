<template lang="html">
  <app-article-author-list
    :article-by-author="articleByAuthor"
  />
</template>

<script>
import { ArticleAuthorList } from '@Components/molecules';

export default {
  components: {
    appArticleAuthorList: ArticleAuthorList,
  },
  computed: {
    articleByAuthor() {
      return this.$store.getters['articles/articleByAuthor'];
    },
  },
  created() {
    this.$store.dispatch('articles/getArticles');
  },
};
</script>
