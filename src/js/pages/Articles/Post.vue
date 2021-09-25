<template lang="html">
  <div>
    <app-article-post
      :target-array="categoryList"
      :value="selected"
      @updateValue="updateValue"
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
    selected() {
      return this.$store.state.articles.targetArticle.category.name;
    },
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
    },
  },
};
</script>
