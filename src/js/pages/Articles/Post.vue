<template lang="html">
  <div>
    <app-article-post
      :article-id="articleId"
      :article-title="articleTitle"
      :article-content="articleContent"
      :markdown-content="markdownContent"
      :current-category-name="currentCategoryName"
      :category-list="categoryList"
      :loading="loading"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      @selectedArticleCategory="selectedArticleCategory"
      @handleSubmit="handleSubmit"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
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
    targetArticle() {
      return this.$store.state.articles.targetArticle;
    },
  },
  watch: {
    targetArticle: {
      handler(newArticle) {
        localStorage.setItem('targetArticle', JSON.stringify(newArticle));
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories'); // 表示がされる際に登録されているカテゴリーを取得してきている。ドロップダウンメニューに表示するため。
    this.$store.dispatch('articles/initPostArticle');
  },
  mounted() {
    if (localStorage.getItem('targetArticle')) {
      this.$store.dispatch('articles/saveTargetArticle',
        JSON.parse(localStorage.getItem('targetArticle')));
    }
  },
  methods: {
    selectedArticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    editedTitle($event) {
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => { // postArticleが終了したら.thne以下を行う。
        localStorage.removeItem('targetArticle');
        this.$router.push({ // 使用しているRouterLinkにpushしている。表示が変わる。
          path: '/articles',
          query: { redirect: '/article/post' },
          // redirect: '/article/post',
        });
        // console.log(this.$router);
      });
    },
  },
};

</script>
