<template lang="html">
  <div>
    <div>
      <app-heading>関連記事の多いカテゴリー</app-heading>

      <ul>
        <li v-for="category in categoryList" :key="category.id">
          {{ category.name }}
        </li>
      </ul>

      <app-router-link to="/categories">
        カテゴリー一覧へ
      </app-router-link>
    </div>
    <div>
      <app-heading>最新記事</app-heading>

      <ul>
        <li v-for="article in articleList" :key="article.id">
          {{ article.title }}
        </li>
      </ul>

      <app-router-link to="/articles">
        記事一覧へ
      </app-router-link>
    </div>
  </div>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
  computed: {
    articleList() {
      return this.$store.state.articles.articleList;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('getAllCategories');
    this.$store.dispatch('articles/getAllArticles');
  },
};
</script>

<style lang="css" scoped>
</style>
