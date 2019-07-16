<template lang="html">
  <div class="home">
    <section class="home__content">
      <app-heading>カテゴリー</app-heading>

      <ul class="home__content__category">
        <li v-for="category in categoryList" :key="category.id">
          <app-router-link
            :to="{ path: '/articles', query: { category: category.name } }"
            underline
            hover-opacity
          >
            {{ category.name }}
          </app-router-link>
        </li>
      </ul>

      <div class="home__content__button">
        <app-router-link
          to="/categories"
          round
          bg-theme-color
          white
          small
        >
          カテゴリーページへ
        </app-router-link>
      </div>
    </section>
    <article class="home__content">
      <app-heading>最新記事 10件</app-heading>

      <ul class="home__content__article">
        <li v-for="article in articleList" :key="article.id">
          <app-router-link
            :to="{ path: `/articles/${article.id}` }"
            block
            hover-opacity
            hover-underline
          >
            <span class="home__content__article__category">
              {{ article.category.name }}
            </span>
            <p class="home__content__article__title">
              {{ article.title }}
            </p>
          </app-router-link>
        </li>
      </ul>

      <div class="home__content__button">
        <app-router-link
          to="/articles"
          round
          bg-theme-color
          white
          small
        >
          記事一覧へ
        </app-router-link>
      </div>
    </article>
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
      return this.$store.getters['articles/tenNewArticleList'];
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

<style lang="postcss" scoped>
.home__content {
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
}
.home__content__category {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -10px;
  width: 50%;
  font-size: 16px;
  > li {
    margin-top: 10px;
    margin-left: 10px;
  }
}

.home__content__article {
  margin-top: 10px;
  > li {
    padding: 10px;
    border-top: 1px solid var(--separatorColor);
    &:first-child {
      border-top: none;
    }
  }
  &__category {
    display: block;
    font-weight: bold;
    font-size: 14px;
    color: var(--themeColor);
  }
  &__title {
    margin-top: 5px;
  }
}

.home__content {
  &__button {
    margin-top: 10px;
  }
}
</style>
