<template lang="html">
  <app-article-post
    :category-list="categoryList"
    :access="access"
    :article-title="articleTitle"
    :article-content="articleContent"
    :loading="loading"
    :category-name="categoryName"
    @editeValue="editeValue"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
    @selectedArticleCategory="selectedArticleCategory"
  />
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
    loading() {
      return this.$store.state.articles.loading;
    },
    categoryName() {
      return this.$store.state.articles.targetArticle.category.name;
    },
  },
  methods: {
    editeValue($event) {
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
        });
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};

</script>
