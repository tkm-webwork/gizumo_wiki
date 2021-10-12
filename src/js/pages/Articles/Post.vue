<template>
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :category-list="categoryList"
    :value="categoryName"
    @selectedArticleCategory="selectedArticleCategory"
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
    categoryName() {
      return this.$store.state.articles.targetArticle.category.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
