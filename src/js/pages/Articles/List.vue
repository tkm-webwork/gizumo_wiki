<template lang="html">
  <div class="articles">
    <app-heading :level="1">すべての一覧・カテゴリーごとの一覧</app-heading>
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
  </div>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';
import { ArticleList } from '@Components/molecules';

export default {
  components: {
    appHeading: Heading,
    appArticleList: ArticleList,
    appRouterLink: RouterLink,
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
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
