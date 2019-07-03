<template lang="html">
  <form class="login" @submit.prevent="signIn">
    <div class="login-form">
      <app-input
        name="email"
        type="text"
        placeholder="メールアドレス"
        required
        vvas="メールアドレス"
        :value="email"
        @updateValue="updateValue"
      />
    </div>
    <div class="login-form">
      <app-input
        name="password"
        type="password"
        placeholder="パスワード"
        required
        vvas="パスワード"
        :value="password"
        @updateValue="updateValue"
      />
    </div>

    <template v-if="errorMessage">
      <div class="login-error">
        <app-text>{{ errorMessage }}</app-text>
      </div>
    </template>

    <div class="login-button">
      <app-button
        class-name="login-button"
        button-type="submit"
        :disabled="disabled ? true : false"
        block
      >
        <template v-if="loading">
          <span>サインイン中です...</span>
        </template>
        <template v-else>
          <span>サインイン</span>
        </template>
      </app-button>
    </div>
  </form>
</template>

<script>
import { Input, Button, Text } from '@Components/atoms';

export default {
  components: {
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
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
    disabled() {
      const isValied = this.errors.items.length > 0;
      return this.loading || isValied;
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    signIn() {
      if (this.disabled) return;
      this.$store.dispatch({
        type: 'signIn',
        email: this.email,
        password: this.password,
      // }).then(() => {
      //   const passwordResetFlg = this.user.password_reset_flg;
      //   if (!passwordResetFlg) {
      //     return this.$router.push('/password/init');
      //   }
      //   return this.$router.push(this.$route.query.redirect || '/');
      // });
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
