<template lang="html">
  <div>
    <app-article-post
      :category-list="categoryList"
      :current-category-name="currentCategoryName"
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :error-message="errorMessage"
      :loading="loading"
      :access="access"
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
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
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
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
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
    postArticle() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle')
        .then(() => {
          this.$router.push({
            path: '/articles',
            query: { redirect: this.$route.fullPath },
          });
        })
        .catch(() => {
          // console.log('err');
        });
    },
  },
};
</script>
