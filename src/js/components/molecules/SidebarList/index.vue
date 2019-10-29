<template lang="html">
  <ul :class="className">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
    >
      <!--
        別ファイルで配列を定義。各オブジェクトにpathプロパティが定義
        つまり、パスの一部を変数として変化させているわけではない
      -->
      <app-router-link
        :to="item.path"
        exact-active-class="is-active"
        hover-opacity
        block
        large
        white
        round
      >
        {{ item.name }}
      </app-router-link>
    </app-list-item>
  </ul>
</template>

<script>
import { ListItem, RouterLink } from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appRouterLink: RouterLink,
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
};
</script>

<style lang="css" scoped>
</style>
