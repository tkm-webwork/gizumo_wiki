<template>
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :category-list="categoryList"
    :value="categoryName"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
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
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    categoryName() {
      return this.$store.state.articles.targetArticle.category.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
