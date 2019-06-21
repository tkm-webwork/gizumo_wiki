<template lang="html">
  <section class="user-list">
    <app-user-list
      :error-message="errorMessage"
      :user-list-length="userListLength"
    />
    <div class="user-list__table">
      <app-user-table
        :target-array="userList"
        :theads="theads"
      />
    </div>
  </section>
</template>

<script>
import { UserList, UserTable } from '@Components/molecules';

export default {
  components: {
    appUserList: UserList,
    appUserTable: UserTable,
  },
  computed: {
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    userList() {
      return this.$store.state.users.userList;
    },
    userListLength() {
      return this.$store.getters.userListLength;
    },
    theads() {
      return ['名前', 'アカウント名', 'メールアドレス', '権限', '', ''];
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>

<style lang="postcss" scoped>
.user-list {
  &__table {
    margin-top: 20px;
  }
}
</style>
