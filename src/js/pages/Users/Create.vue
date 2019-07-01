<template lang="html">
  <app-user-create
    :loading="loading"
    caution-message="※ 文頭・文末・文中の全角・半角スペースは削除されます。"
    :error-message="errorMessage"
    :done-message="doneMessage"
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
    doneMessage() {
      return this.$store.state.users.doneMessage;
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
      if (this.loading) return;
      this.$store.dispatch('createUser', {
        /* eslint-disable-next-line no-irregular-whitespace */
        account_name: this.accountName.replace(/( |　)+/, '').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        email: this.email.replace(/( |　)+/, '').trim(),
        /* eslint-disable-next-line no-irregular-whitespace */
        password: this.password.replace(/( |　)+/, '').trim(),
      }).then(() => {
        this.$router.push('/users');
      });
    },
  },
};
</script>
