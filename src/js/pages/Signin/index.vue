<template lang="html">
  <app-signin-form
    :loading="loading"
    :email="email"
    :password="password"
    :error-message="errorMessage"
    @updateValue="updateValue"
    @handleSubmit="signIn"
  />
</template>

<script>
import { SigninForm } from '@Components/molecules';

export default {
  components: { appSigninForm: SigninForm },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.auth.loading;
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('auth/clearMessage');
  },
  methods: {
    updateValue(target) {
      this[target.name] = target.value;
    },
    signIn() {
      if (this.loading) return;
      this.$store.dispatch({
        type: 'auth/signIn',
        email: this.email,
        password: this.password,
      }).then(() => this.$router.push(this.$route.query.redirect || '/'));
    },
  },
};
</script>

<style lang="postcss" scoped>
.login {
  margin: 100px auto 0;
  padding: 40px;
  max-width: 500px;
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  &-form {
    & + & {
      margin-top: 25px;
    }
  }
  &-error {
    margin-top: 20px;
    color: var(--errorColor);
  }
  &-button {
    margin-top: 20px;
  }
}
</style>
