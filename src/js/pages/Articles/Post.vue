<template lang="html">
  <div>
    <app-article-post
      :target-array="categoryList"
      :target-article="targetArticle"
      @selectedArticleCategory="selectedArticleCategory"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
    />
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
    targetArticle() {
      return this.$store.state.articles.targetArticle;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    selectedArticleCategory($event) {
      this.$store.dispatch(
        'articles/selectedArticleCategory',
        $event.target.value,
      );
    },
    editedTitle($event) {
      this.$store.dispatch(
        'articles/editedTitle',
        $event.target.value,
      );
    },
    editedContent($event) {
      this.$store.dispatch(
        'articles/editedContent',
        $event.target.value,
      );
    },
  },
};
</script>
