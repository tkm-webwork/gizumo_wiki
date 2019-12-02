<template lang="html">
  <div>
    <app-article-post
      :category-list="categoryList"
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :access="access"
      :category-name="categoryName"
      :loading="loading"
      :error-message="errorMessage"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @handleSubmit="handleSubmit"
      @selectedArticleCategory="selectedArticleCategory"
      @clearContent="clearContent"
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
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
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
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
    this.$store.dispatch('articles/clearMessage');
  },
  mounted() {
    // const editTitle = this.$localStorage.get('editTitle');
    // if (editTitle != null) {
    //   this.$store.dispatch('articles/setEditTitle', editTitle);
    // }
    // const editContent = this.$localStorage.get('editContent');
    // if (editContent != null) {
    //   this.$store.dispatch('articles/setEditContent', editContent);
    // }
    // const editCategoryName = this.$localStorage.get('editCategoryName');
    // if (editCategoryName != null) {
    //   this.$store.dispatch('articles/setEditCategoryName', editCategoryName);
    // }
    const editObject = this.$localStorage.get('editObject');
    if (editObject.val !== null) {
      this.$store.dispatch('articles/setEditObject', editObject);
    }
  },
  methods: {
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
      // this.$localStorage.set('editTitle', $event.target.value);
      this.$localStorage.set('editObject', this.$store.state.articles.targetArticle);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
      // this.$localStorage.set('editContent', $event.target.value);
      this.$localStorage.set('editObject', this.$store.state.articles.targetArticle);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$router.push({
          path: '/articles',
          query: { redirect: '/article/post' },
        });
        // this.$localStorage.remove('editTitle');
        // this.$localStorage.remove('editContent');
        // this.$localStorage.remove('editCategoryName');
        this.$localStorage.remove('editObject');
      });
    },
    selectedArticleCategory($event) {
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
      // this.$localStorage.set('editCategoryName', $event.target.value);
      this.$localStorage.set('editObject', this.$store.state.articles.targetArticle);
    },
    clearContent() {
      this.$store.dispatch('articles/initPostArticle');
      // this.$localStorage.remove('editTitle');
      // this.$localStorage.remove('editContent');
      // this.$localStorage.remove('editCategoryName');
      this.$localStorage.remove('editObject');
    },
  },
};
</script>
