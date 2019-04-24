<template lang="html">
  <ul :class="className">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
    >
      <app-text>{{ item.title }}</app-text>
      <app-router-link
        :to="`articles/${item.id}`"
      >
        詳細
      </app-router-link>
      <app-router-link
        :to="`articles/${item.id}/edit`"
      >
        更新
      </app-router-link>
      <app-button>削除</app-button>
    </app-list-item>
  </ul>
</template>

<script>
import {
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
  },
  /* computed: {
    articlesArray() {
      console.log(this.$store.getters.transformedArticles);
      return this.$store.getters.transformedArticles;
    },
  }, */
};
</script>

<style lang="scss" scoped>
</style>
