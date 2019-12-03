<template lang="html">
  <div>
    <app-article-post
      :category-list="getCategoryList"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :markdown-content="markdownContent"
      :article-title="articleTitle"
      :article-content="articleContent"
      :current-category-name="currentCategoryName"
      :access="access"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @selectedArticleCategory="selectedArticleCategory"
      @handleSubmit="handleSubmit"
    ></app-article-post>
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('articles/clearMessage');
  },
  computed: {
    getCategoryList() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    disabled() {
      return this.access.create && this.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    articleTitle() {
      return this.$store.state.articles.targetArticle.title;
    },
    articleContent() {
      return this.$store.state.articles.targetArticle.content;
    },
    markdownContent() {
      return `# ${this.articleTitle} \n ${this.articleContent}`;
    },
    currentCategoryName() {
      return this.$store.state.articles.targetArticle.category.name;
    },
  },
  methods: {
    editedTitle(event) {
      this.$store.dispatch('articles/editedTitle', event.target.value);
    },
    editedContent(event) {
      this.$store.dispatch('articles/editedContent', event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$router.push({
          path: '/articles',
          query: { redirect: 'article' },
        });
      });
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>
