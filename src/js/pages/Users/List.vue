<template lang="html">
  <app-user-list
    :error-message="errorMessage"
    :user-list="userList"
    :user-list-length="userListLength"
    :theads="theads"
  />
</template>

<script>
import { UserList } from '@Components/molecules';

export default {
  components: {
    appUserList: UserList,
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
