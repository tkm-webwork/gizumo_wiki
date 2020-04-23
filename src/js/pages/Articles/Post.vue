<template lang="html">
  <app-article-post
    :article-id="articleId"
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :loading="loading"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :access="access"
    @selectedArticleCategory="selectedArticleCategory"
    @postTitle="postTitle"
    @postContent="postContent"
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
    this.$store.dispatch('articles/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
  },
  methods: {
    postTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    postContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle')
      .then(() => this.$router.push('/articles'))
      .then(() => this.$store.dispatch('articles/donePostArticle'));
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
