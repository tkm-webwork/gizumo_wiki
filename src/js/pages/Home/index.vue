<template lang="html">
  <div class="home">
    <section class="home__content">
      <app-home-category :category-list="categoryList" />
    </section>

    <article class="home__content">
      <app-home-article :article-list="articleList" />
    </article>
  </div>
</template>

<script>
import { HomeCategory, HomeArticle } from '@Components/molecules';

export default {
  components: {
    appHomeCategory: HomeCategory,
    appHomeArticle: HomeArticle,
  },
  computed: {
    articleList() {
      return this.$store.getters['articles/tenNewArticleList'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/getAllArticles', 1);
  },
};
</script>

<style lang="postcss" scoped>
.home__content {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
</style>
