<template lang="html">
  <app-articles-post
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :markdown-content="markdownContent"
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

export default ({
  components: {
    appArticlesPost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
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
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
});
</script>
