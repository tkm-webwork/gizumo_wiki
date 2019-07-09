<template lang="html">
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :category-list="categoryList"
    :loading="loading"
    :error-message="errorMessage"
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
    loading() {
      return this.$store.state.articles.loading;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('initPostArticle');
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('editedContent', $event.target.value);
    },
    selectedArticleCategory($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.$store.dispatch('selectedArticleCategory', categoryName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('postArticle').then(() => {
        this.$router.push('/articles');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-edit {
  display: flex;
  height: 100%;
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
  }
  &-preview {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
  }
  &-form {
    margin-top: 20px;
  }
}
</style>
