<template lang="html">
  <div class="articles">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
      key-color
      white
      bg-lightgreen
      large
      class="articles-create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <div class="articles-content">
      <app-article-list
        :target-array="articlesList"
        border-gray
      />
    </div>
    <app-modal>
      モーダルのテスト
    </app-modal>
    <button
      @click="toggleModal"
    >
      モーダルの開閉ボタン
    </button>
  </div>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';
import { ArticleList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appHeading: Heading,
    appArticleList: ArticleList,
    appRouterLink: RouterLink,
  },
  mixins: [Mixins],
  data() {
    return {
      title: 'すべて',
    };
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    articlesList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    if (this.$route.query.category) {
      const { category } = this.$route.query;
      this.title = category;
      this.$store.dispatch('filteredArticles', category);
      if (this.$store.state.articles.articleList.length === 0) {
        this.$router.push({ path: '/notfound' });
      }
    } else {
      this.$store.dispatch('showAllArticles');
    }
  },
};
</script>

<style lang="css" scoped>
  .articles-create-link {
    margin-top: 16px;
  }
  .articles-content {
    margin-top: 16px;
  }
</style>
