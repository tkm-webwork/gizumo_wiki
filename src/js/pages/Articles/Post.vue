<template lang="html">
  <div>
    <app-article-post :target-array="categoryList" />
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
};
</script>
