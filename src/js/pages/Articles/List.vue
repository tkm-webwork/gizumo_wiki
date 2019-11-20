<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="currentArticlesList"
      :page="page"
      :done-message="doneMessage"
      :access="access"
      :category-name="categoryName"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
      @clearMessage="clearMessage"
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
  beforeRouteUpdate(to, from, next) { // コンポーネントが再利用される際に呼ばれる
    // this.$route/fromが遷移元、toが遷移先。queryから抜き出した状態はstring型なので、numberに変換する
    const page = to.query.page ? parseInt(to.query.page, 10) : 1;
    const categoryName = to.query.category ? to.query.category : null;
    this.categoryName = categoryName;
    this.changeArticlePage(page, categoryName);
    next();
  },
  data() {
    return {
      title: 'すべて',
      categoryName: '',
    };
  },
  computed: {
    currentArticlesList() {
      return this.$store.state.articles.currentArticlesList;
    },
    page() {
      return this.$store.state.articles.page;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() { // ページを更新しても前回の画面が表示されるように、既存のURLから取得
    const page = this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
    const categoryName = this.$route.query.category ? this.$route.query.category : null; // クエリストリングを参照
    this.categoryName = categoryName;
    this.changeArticlePage(page, categoryName);
  },
  methods: {
    changeArticlePage(page, categoryName) { // 子のクエリストリングから取得したページ数と（あれば）カテゴリ名も渡す
      this.$store.dispatch('articles/updatePageNumber', page) // ページ数をstateに反映=>子のpropsが更新される
        .then(() => {
          this.$store.dispatch('articles/getArticles', { page, categoryName }); // 記事取得のHTTP通信
        }).then(() => {
          if (this.$store.state.articles.articleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
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
          const page = this.$route.query.page ? parseInt(this.$route.query.page, 10) : 1;
          this.$store.dispatch('articles/getArticles', { categoryName, page });
        });
    },
  },
};
</script>
