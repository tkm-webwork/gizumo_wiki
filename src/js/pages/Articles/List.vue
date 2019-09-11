<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      :current-page="currentPage"
      :last-page="lastPage"
      :category="selectedCategory"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
    />
  </div>
</template>

<script>
import { ArticleList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    const pageNum = to.query.page;
    this.fetchArticles(pageNum);
    next();
  },
  data() {
    return {
      title: 'すべて',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
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
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
    selectedCategory() {
      return this.$store.state.articles.selectedCategory;
    },
  },
  created() {
    const pageNum = this.$route.query.page ? this.$route.query.page : 1;
    this.fetchArticles(pageNum);
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('articles/deleteArticle');
      this.toggleModal();
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('articles/getAllArticles');
      }
    },
    fetchArticles(pageNum) {
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('articles/getAllArticles', { pageNum, category })
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        const category = undefined;
        this.$store.dispatch('articles/getAllArticles', { pageNum, category });
      }
    },
  },
};
</script>
