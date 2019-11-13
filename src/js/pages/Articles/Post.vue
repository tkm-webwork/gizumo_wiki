<template lang="html">
  <app-article-post
    :current-category-name="currentCategoryName"
    :done-message="doneMessage"
    :error-message="errorMessage"
    :category-list="categoryList"
    :article-title="articleTitle"
    :article-content="articleContent"
    :loading="loading"
    :markdown-content="markdownContent"
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
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
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
    loading() {
      return this.$store.state.articles.loading;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
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
          this.$router.push({
            path: '/articles',
            query: { redirect: '/articles/post' },
          });
        });
    },
  },
};
</script>
