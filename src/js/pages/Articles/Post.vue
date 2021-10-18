<template lang="html">
  <div>
    <app-article-post
      :target-array="categoryList"
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :current-category-name="currentCategoryName"
      :error-message="errorMessage"
      :access="access"
      :loading="loading"
      @selectedArticleCategory="selectedArticleCategory"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @handleSubmit="postArticle"
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
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.articles.loading;
    },
  },
  created() {
    this.$store.dispatch('articles/initPostArticle');
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
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    postArticle() {
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$store.dispatch('articles/initPostArticle');
        this.$router.push({
          path: '/articles',
          query: { redirect: this.$route.fullPath },
        });
      });
    },
  },
};
</script>
