<template lang="html">
  <div class="articles">
    <section>
      <app-article-list
        :title="title"
        :target-array="articlesList"
        :done-message="doneMessage"
        :is-trashed="true"
        border-gray
      />
    </section>
    <section class="artciles-list-Pagination">
      <app-Pagination
        :last-page="lastPage"
        :current-page="currentPage"
        @toPage="toPage"
      />
    </section>
  </div>
</template>

<script>
import { ArticleList, Pagination } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
    appPagination: Pagination,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    this.getArticles(to);
    next();
  },
  data() {
    return {
      title: '削除',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
    currentPage() {
      return this.$store.state.articles.currentPage;
    },
  },
  created() {
    this.getArticles(this.$route);
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('articles/confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('articles/deleteArticle')
        .then(() => {
          this.toggleModal();
          this.$store.dispatch('articles/getArticles');
        });
    },
    fetchArticles() {
      this.$store.dispatch('articles/getArticles', true)
        .then(() => {
          if (this.$store.state.articles.articleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
        });
    },
    getArticles(route) {
      const category = route.query.category || null;
      const page = route.query.page || null;
      this.$store.commit('articles/setQuery', { category, page });
      this.fetchArticles();
    },
    toPage(page) {
      if (page === 0) return;
      const query = {};
      query.page = page;
      this.$router.push({
        path: '/articles/trashed',
        query,
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
.artciles-list-Pagination {
  margin-top: 30px;
}
</style>
