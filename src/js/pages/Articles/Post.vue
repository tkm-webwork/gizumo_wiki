<template lang="html">
  <app-article-post
    :category-list="categoryList"
    :article-title="articleTitle"
    :article-content="articleContent"
    :current-category-name="currentCategoryName"
    :markdown-content="markdownContent"
    @selectedArticleCategory="selectedArticleCategory"
    @newTitle="newTitle"
    @newContent="newContent"
    @handleSubmit="handleSubmit"
  />
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
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    // categoryList() {
    //   const { categoryList } = this.$store.state.categories;
    //   return categoryList;
    // },
    newTitle($event) {
      this.$store.dispatch('articles/newTitle', $event.target.value);
    },
    newContent($event) {
      this.$store.dispatch('articles/newContent', $event.target.value);
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      console.log(categoryName);
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle');
    },
  },
};
</script>
