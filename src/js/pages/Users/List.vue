<template lang="html">
  <section class="users-list">
    <app-heading :level="1">ユーザー一覧</app-heading>
    <app-router-link
      to="/users/create"
      hover-opacity
      block
      large
      white
      round
    >
      新規ユーザーの作成
    </app-router-link>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <ul>
      <app-list-item
        v-for="user in usersList"
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
        <div class="article-list-links">
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
  </section>
</template>

<script>
import {
  RouterLink,
  ListItem,
  Button,
  Heading,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appListItem: ListItem,
    appButton: Button,
    appText: Text,
    appHeading: Heading,
  },
  computed: {
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    usersList() {
      return this.$store.state.users.usersList;
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>

<style lang="css" scoped>
</style>
