<template lang="html">
  <section class="users-list">
    <app-heading :level="1">ユーザー一覧</app-heading>

    <div class="users-list__create">
      <app-router-link
        to="/users/create"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        新規ユーザーの作成
      </app-router-link>
    </div>

    <div v-if="errorMessage" class="users-list__error">
      <app-text bg-error>
        {{ errorMessage }}
      </app-text>
    </div>

    <div class="users-list__table">
      <app-user-table :target-array="userList" :theads="theads" />
    </div>
  </section>
</template>

<script>
import { RouterLink, Heading, Text } from '@Components/atoms';
import { UserTable } from '@Components/molecules';

export default {
  components: {
    appUserTable: UserTable,
    appRouterLink: RouterLink,
    appHeading: Heading,
    appText: Text,
  },
  computed: {
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    userList() {
      return this.$store.state.users.userList;
    },
    theads() {
      return ['名前', 'アカウント名', '権限', '', ''];
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>

<style lang="css" scoped>
.users-list {
  &__create {
    margin-top: 20px;
  }
  &__error {
    margin-top: 20px;
  }
  &__table {
    margin-top: 20px;
  }
}
</style>
