<template lang="html">
  <div class="home-article">
    <app-heading>最新記事 10件</app-heading>

    <ul class="home-article__list">
      <li v-for="article in articleList" :key="genUniqueKey(article)">
        <app-router-link
          :to="{ path: `/articles/${article.id}` }"
          block
          hover-opacity
          hover-underline
        >
          <span v-if="article.category" class="home-article__list__category">
            {{ article.category.name }}
          </span>
          <span v-else class="home-article__list__category">
            カテゴリー:未設定
          </span>
          <p class="home-article__list__title">
            {{ article.title }}
          </p>
        </app-router-link>
      </li>
    </ul>

    <div class="home-article__button">
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
  </div>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
  mixins: [Mixins],
  props: {
    articleList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss" scoped>
.home-article__list {
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
.home-article__button {
  margin-top: 10px;
}
</style>
