<template lang="html">
  <app-article-edit
    :article-id="articleId"
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :loading="loading"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { ArticleEdit } from '@Components/molecules';

export default {
  components: {
    appArticleEdit: ArticleEdit,
  },
  data() {
    return {
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
  },
  created() {
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('getArticleDetail', parseInt(this.articleId, 10));
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('updateArticle');
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('selectedArticleCategory', categoryName);
    },
  },
};
</script>
