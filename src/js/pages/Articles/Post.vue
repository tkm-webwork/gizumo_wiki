<template lang="html">
  <app-article-post
    :error-message="errorMessage"
    :category-name="categoryName"
    :category-list="categoryList"
    :article-title="articleTitle"
    :article-content="articleContent"
    :access="access"
    :markdown-content="markdownContent"
    :loading="loading"
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
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    categoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
  },
  created() {
    this.$store.dispatch('articles/initPostArticle');
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle')
        .then(() => {
          this.$router.push({ path: '/articles' });
          this.$store.dispatch('articles/postArticleSuccesMessage');
          this.$store.dispatch('articles/initPostArticle');
        });
    },
  },
};
</script>
