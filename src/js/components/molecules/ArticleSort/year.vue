<template>
  <div class="article-sort__box">
    <app-text>
      {{ year }}
    </app-text>
    <app-list-item
      v-for="article in filterArticleList"
      :key="article.id"
      beetween
      align-items
      flex
      bg-white
      large
      border-bottom-gray
    >
      <app-text class="article-sort__box__user">
        {{ article.user }}
      </app-text>
      <app-list-item
        v-for="articleTitle in article.articles"
        :key="articleTitle.id"
        beetween
        flex
        bg-white
        large
      >
        <app-text class="article-sort__box__title">
          {{ articleTitle.title }}
        </app-text>
      </app-list-item>
    </app-list-item>
  </div>
</template>

<script>
import {
  ListItem,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appText: Text,
  },
  props: {
    filterArticleList: {
      type: Array,
      default: () => [],
    },
    year: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="postcss" scoped>

</style>
