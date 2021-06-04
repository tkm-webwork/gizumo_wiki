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
    // articleId() {
    //   let { id } = this.$route.params;
    //   id = parseInt(id, 10);
    //   return id;
    // },
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
  },
  methods: {
    // カテゴリー選択
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    // 新規追加タイトルの入力
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
      console.log('title:', $event.target.value);
    },
    // 新規追加コンテントの入力
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
      console.log('content:', $event.target.value);
    },
    // 送信ボタン押した時
    handleSubmit() {
      console.log('pages: handleSubmit発火しました');
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$store.dispatch('articles/initPostArticle');
      });
    },
  },
});
</script>
