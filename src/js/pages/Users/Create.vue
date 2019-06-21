<template lang="html">
  <app-user-create
    :loading="loading"
    caution-message="※ 文頭・文末の全角・半角スペースは削除され、文中の全角スペースは半角スペースに置き換えられます。"
    :error-message="errorMessage"
    :account-name="accountName"
    :email="email"
    :password="password"
    @back="back"
    @clearMessage="clearMessage"
    @updateValue="updateValue"
    @createUser="createUser"
  />
</template>

<script>
import { UserCreate } from '@Components/molecules';

export default {
  components: {
    appUserCreate: UserCreate,
  },
  data() {
    return {
      accountName: '',
      email: '',
      password: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clearMessage() {
      this.$store.dispatch('clearMessage');
    },
    updateValue(target) {
      this[target.name] = target.value;
    },
    createUser() {
      this.$store.dispatch('clearMessage');
      if (!this.loading) {
        this.$store.dispatch('createUser', {
          /* eslint-disable-next-line no-irregular-whitespace */
          account_name: this.accountName.replace(/( |　)+/, ' ').trim(),
          /* eslint-disable-next-line no-irregular-whitespace */
          email: this.email.replace(/( |　)+/, ' ').trim(),
          /* eslint-disable-next-line no-irregular-whitespace */
          password: this.password.replace(/( |　)+/, ' ').trim(),
        });
      }
    },
  },
};
</script>
