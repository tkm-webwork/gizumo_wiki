<template lang="html">
  <div>
    <app-article-post
      :access="access"
      :loading="loading"
      :category-list="categoryList"
      :value="categoryName"
      :article-title="articleTitle"
      :article-content="articleContent"
      :error-message="errorMessage"
      :markdown-content="markdownContent"
      @clearMessage="clearMessage"
      @selectedArticleCategory="selectedCategory"
      @updateTitle="updateTitle"
      @updateContent="updateContent"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';
import { mapActions, mapGetters } from 'vuex';

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
    access() {
      return this.$store.getters['auth/access'];
    },
    ...mapGetters('categories', [
      'categoryList',
    ]),
    ...mapGetters('articles', [
      'loading',
      'errorMessage',
      'doneMessage',
      'targetArticle',
    ]),
    categoryName() {
      return this.targetArticle.category.name;
    },
    articleTitle() {
      const { title } = this.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.targetArticle;
      return content;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
  },
  created() {
    this.getAllCategories();
    this.initPostArticle();
  },
  methods: {
    ...mapActions('categories', [
      'getAllCategories',
    ]),
    ...mapActions('articles', [
      'clearMessage',
      'postArticle',
      'editTitle',
      'editContent',
      'selectedArticleCategory',
      'initPostArticle',
    ]),
    updateTitle($event) {
      this.editTitle($event.target.value);
    },
    updateContent($event) {
      this.editContent($event.target.value);
    },
    selectedCategory($event) {
      const categoryName = $event.target.value ? $event.target.value : '';
      this.selectedArticleCategory(categoryName);
    },
    handleSubmit() {
      if (this.loading) return;
      this.postArticle()
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
