<template lang="html">
  <ul>
    <app-list-item
      v-for="user in targetArray"
      :key="user.id"
      flex
      beetween
      align-items
      bg-white
      large
    >
      <app-text inline-block>{{ user.username }}</app-text>
      <app-text inline-block>{{ user.accountname }}</app-text>
      <app-text inline-block>{{ user.role }}</app-text>
      <div>
        <app-router-link
          :to="`/users/${user.id}`"
          bg-keycolor
          large
          white
        >
          詳細
        </app-router-link>
        <app-button
          bg-danger
        >
          削除
        </app-button>
      </div>
    </app-list-item>
  </ul>
</template>

<script>
import {
  RouterLink,
  ListItem,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appButton: Button,
    appListItem: ListItem,
    appText: Text,
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="css" scoped>
</style>
