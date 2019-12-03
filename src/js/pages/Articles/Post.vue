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
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('articles/clearMessage');
  },
  mounted() {
    const targetArticleObj = JSON.parse(localStorage.getItem('targetArticleObj'));
    if (targetArticleObj) {
      this.$store.dispatch('articles/setArticle', targetArticleObj);
    }
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
      const article = this.$store.state.articles.targetArticle;
      localStorage.setItem('targetArticleObj', this.parseArticle(article));
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
      const article = this.$store.state.articles.targetArticle;
      localStorage.setItem('targetArticleObj', this.parseArticle(article));
    },
    selectedArticleCategory($event) {
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
      const article = this.$store.state.articles.targetArticle;
      localStorage.setItem('targetArticleObj', this.parseArticle(article));
    },
    parseArticle(article) {
      return JSON.stringify(article);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        localStorage.removeItem('targetArticleObj');
        this.$router.push({
          path: '/articles',
          query: { redirect: 'article' },
        });
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
</style>
