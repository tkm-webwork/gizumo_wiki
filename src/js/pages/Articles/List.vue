<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="currentArticlesList"
      :current-article-page="currentArticlePage"
      :done-message="doneMessage"
      :access="access"
      :last-page="lastPage"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
      @clearMessage="clearMessage"
      @changeArticlePage="changeArticlePage"
      @minusArticlePage="minusArticlePage"
      @plusArticlePage="plusArticlePage"
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
  beforeRouteUpdate(to, from, next) { // urlの遷移で発火させる画面の再描画を定義。
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
    currentArticlesList() {
      return this.$store.state.articles.currentArticlesList;
    },
    currentArticlePage() {
      return this.$store.state.articles.currentArticlePage;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    lastPage() {
      return this.$store.state.articles.lastPage;
    },
  },
  created() {
    const categoryName = this.$route.query.category ? this.$route.query.category : null;
    this.fetchArticles(categoryName);
  },
  methods: {
    changeArticlePage(page) { // 追加。ページ番号更新後にリストを通信で取得
      this.$store.dispatch('articles/updatePageNumber', page)
        .then(() => {
          this.$store.dispatch('articles/changeArticleList');
        });
    },
    plusArticlePage() { // 追加。ページ番号更新後にリストを通信で取得
      this.$store.dispatch('articles/updatePageNumber', this.currentArticlePage + 1)
        .then(() => {
          this.$store.dispatch('articles/changeArticleList');
        });
    },
    minusArticlePage() { // 追加。ページ番号更新後にリストを通信で取得
      this.$store.dispatch('articles/updatePageNumber', this.currentArticlePage - 1)
        .then(() => {
          this.$store.dispatch('articles/changeArticleList');
        });
    },
    clearMessage() {
      this.$store.dispatch('articles/clearMessage');
    },
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
    fetchArticles(categoryName) { // そもそも記事が存在しなかった場合、notFoundパスに移動
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
