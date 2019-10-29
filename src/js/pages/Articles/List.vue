<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      :done-message="doneMessage"
      :access="access"
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
    const categoryName = to.query.category ? to.query.category : null;
    this.fetchArticles(categoryName);
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
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const categoryName = this.$route.query.category ? this.$route.query.category : null;
    this.fetchArticles(categoryName);
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
          const categoryName = this.$route.query.category
            ? this.$route.query.category : null;
          this.$store.dispatch('articles/getArticles', categoryName);
        });
    },
    fetchArticles(categoryName) { // 対象カテゴリーの記事が存在しなかった場合、notFoundパスに移動
      this.$store.dispatch('articles/getArticles', categoryName)
        .then(() => {
          if (this.$store.state.articles.articleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
        });
    },
  },
};
</script>
