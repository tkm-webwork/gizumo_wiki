<template>
  <div>
    <app-text>
      {{ year }}
    </app-text>
    <app-text>
      {{ user }}
    </app-text>
    <app-list-item
      v-for="article in filterArticleList"
      :key="article.id"
      flex
      beetween
      align-items
      bg-white
      large
      border-bottom-gray
    >
      <app-text>
        {{ article.title }}
      </app-text>
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
