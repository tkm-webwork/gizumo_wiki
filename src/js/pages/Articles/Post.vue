<template lang="html">
  <app-article-post
    :target-article-title="targetArticleTitle"
    :target-article-content="targetArticleContent"
    :article-category-name="articleCategoryName"
    :markdown-content="markdownContent"
    :category-list="categoryList"
    :loading="loading"
    :error-message="errorMessage"
    :access="access"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    targetArticleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    targetArticleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    articleCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    markdownContent() {
      return `# ${this.targetArticleTitle}\n${this.targetArticleContent}`;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('articles/clearMessage');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    selectedArticleCategory($event) {
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
    },
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$router.push({
          path: '/articles',
          query: { redirect: this.$route.fullPath },
        });
      }).catch(() => {
      });
    },
  },
};
</script>
