<template lang="html">
  <div>
    <app-article-post
      :category-list="categoryList"
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :access="access"
      :category-name="categoryName"
      :loading="loading"
      :error-message="errorMessage"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @handleSubmit="handleSubmit"
      @selectedArticleCategory="selectedArticleCategory"
    />
  </div>
</template>
<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
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
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    categoryName() {
      return this.$store.state.articles.targetArticle.category.name;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('articles/clearMessage');
  },
  methods: {
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
          query: { redirect: '/article/post' },
        });
      });
    },
    selectedArticleCategory($event) {
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
    },
  },
};
</script>
