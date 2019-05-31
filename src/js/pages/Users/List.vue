<template lang="html">
  <section class="users-list">
    <app-heading :level="1">ユーザー一覧</app-heading>
    <app-router-link
      to="/users/create"
      hover-opacity
      small
      white
      round
      bg-keycolor
    >
      新規ユーザーの作成
    </app-router-link>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <app-user-list :target-array="userList" />
  </section>
</template>

<script>
import { RouterLink, Heading } from '@Components/atoms';
import { UserList } from '@Components/molecules';

export default {
  components: {
    appUserList: UserList,
    appRouterLink: RouterLink,
    appHeading: Heading,
  },
  computed: {
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    userList() {
      return this.$store.state.users.userList;
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>

<style lang="css" scoped>
</style>
