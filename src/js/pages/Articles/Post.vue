<template lang="html">
  <div>
    <app-article-post
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :access="access"
      :category-list="categoryList"
      :current-category-name="currentCategoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @selectedArticleCategory="selectedArticleCategory"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @handleSubmit="handleSubmit"
      :loading="loading"


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
      category: '',
      title: '',
      content: '',
    };
  },
  computed: {
    articleId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
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
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle')
        .then(() => {
          this.$router.push({
            path: '/articles',
            query: { redirect: '/article/post' },
          });
        });
    },
  },
};
</script>
