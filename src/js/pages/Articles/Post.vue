<template lang="html">
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :loading="loading"
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
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    if (localStorage.savedState) {
      this.$store.dispatch('articles/loadLocalStorage');
    } else {
      this.$store.dispatch('articles/initPostArticle');
    }
    // this.$store.dispatch('articles/initPostArticle'); // ここでinitPostArticleを渡してinputの中身をからにしてる
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
      this.$store.dispatch('articles/saveLocalStorage');
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
      this.$store.dispatch('articles/saveLocalStorage');
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle')
        .then(() => {
          this.$store.dispatch('articles/deleteLocalStorage');
        });
      this.$router.push({ path: '/articles' });
      this.$store.dispatch('articles/getArticles');
    },
  },
};
</script>
