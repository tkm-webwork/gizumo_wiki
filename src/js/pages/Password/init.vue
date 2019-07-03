<template lang="html">
  <app-password-form
    :password="password"
    :new-password="newPassword"
    :confirm-new-password="confirmNewPassword"
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
      console.log('submit OK');
    },
  },
};
</script>
