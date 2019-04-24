<template lang="html">
  <div class="articles">
    <app-heading :level="1">すべての一覧・カテゴリーごとの一覧</app-heading>
    <app-router-link to="articles/post">
      新しいドキュメントを作る
    </app-router-link>
    <div class="articles-content">
      <app-article-list
        class-name="articles-list"
        :target-array="articlesList"
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

<style lang="scss" scoped>
</style>
