<template lang="html">
  <app-user-detail
    caution-message="※ 名前以外の文頭・文末・文中の全角・半角スペースは削除されます。"
    :error-message="errorMessage"
    :done-message="doneMessage"
    :user="user"
    :options="roleList"
    :disabled="loading ? true : false"
    @clearMessage="clearMessage"
    @updateValue="updateValue"
    @editUser="editUser"
  />
</template>

<script>
import { UserDetail } from '@Components/molecules';

export default {
  components: {
    appUserDetail: UserDetail,
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    doneMessage() {
      return this.$store.state.users.doneMessage;
    },
    user() {
      return this.$store.state.users.user;
    },
    roleList() {
      return this.$store.state.users.roleList;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('getUser', { id });
    this.$store.dispatch('clearMessage');
  },
  destroyed() {
    this.$store.dispatch('clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('clearMessage');
    },
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('updateValue', target);
    },
    editUser() {
      this.$store.dispatch('editUser', {
        id: this.user.id,
        /* eslint-disable-next-line no-irregular-whitespace */
        full_name: this.user.fullName.replace(/(　)+/, ' ').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        account_name: this.user.accountName.replace(/( |　)+/, '').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        email: this.user.email.replace(/( |　)+/, '').trim(),
        role_id: this.roleList.find(role => role.value === this.user.role).id,
      });
    },
  },
};
</script>
