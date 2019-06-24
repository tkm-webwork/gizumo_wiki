<template lang="html">
  <app-user-detail
    :loading="loading"
    caution-message="※ 文頭・文末の全角・半角スペースは削除され、文中の全角スペースは半角スペースに置き換えられます。"
    :error-message="errorMessage"
    :user="user"
    :options="roleArray"
    @back="back"
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
    user() {
      return this.$store.state.users.user;
    },
    loading() {
      return this.$store.state.users.loading;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    roleArray() {
      return this.$store.state.users.roleArray;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('getUser', { id });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clearMessage() {
      this.$store.dispatch('clearMessage');
    },
    updateValue(target) {
      if (!this.loading) this.$store.dispatch('updateValue', target);
    },
    editUser() {
      const user = {
        /* eslint-disable-next-line no-irregular-whitespace */
        full_name: this.user.fullName.replace(/(　)+/, ' ').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        account_name: this.user.accountName.replace(/(　)+/, ' ').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        email: this.user.email.replace(/(　)+/, ' ').trim(),
        role: this.user.role,
      };
      this.$store.dispatch('editUser', user);
    },
  },
};
</script>
