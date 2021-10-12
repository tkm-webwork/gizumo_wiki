<template lang="html">
  <app-article-post
    :category-list="categoryList"
  />
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};

</script>
