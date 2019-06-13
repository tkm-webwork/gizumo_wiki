<template lang="html">
  <app-user-list
    :error-message="errorMessage"
    :user-list="userList"
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
    theads() {
      return ['名前', 'アカウント名', '権限', '', ''];
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
};
</script>
