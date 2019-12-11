<template lang="html">
  <div class="home-category">
    <app-heading>カテゴリー</app-heading>

    <ul class="home-category__list">
      <li v-for="category in categoryList" :key="createUniqueKey(category.id)">
        <app-router-link
          :to="{ path: '/articles', query: { category: category.name } }"
          underline
          hover-opacity
        >
          {{ category.name }}
        </app-router-link>
      </li>
    </ul>

    <div class="home-category__button">
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
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss" scoped>
.home-category__list {
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
.home-category__button {
  margin-top: 10px;
}
</style>
