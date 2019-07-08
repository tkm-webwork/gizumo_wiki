<template lang="html">
  <app-password-form
    :loading="loading"
    :password="password"
    :new-password="newPassword"
    :confirm-new-password="confirmNewPassword"
    :button-text="buttonText"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @updateValue="updateValue"
    @handleSubmit="setPassword"
  />
</template>

<script>
import { PasswordForm } from '@Components/molecules';

export default {
  components: {
    appPasswordForm: PasswordForm,
  },
  data() {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
    buttonText() {
      return this.loading ? '設定中です...' : '設定';
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    doneMessage() {
      return this.$store.state.auth.doneMessage;
    },
  },
  methods: {
    updateValue(target) {
      this[target.name] = target.value;
    },
    setPassword() {
      if (this.loading) return;
      this.$store.dispatch('changePassword', {
        password: this.password,
        new_password: this.newPassword,
        new_password_confirm: this.confirmNewPassword,
      }).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>
