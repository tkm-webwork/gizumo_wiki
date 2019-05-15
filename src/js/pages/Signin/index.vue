<template lang="html">
  <form class="login" @submit.prevent="signIn">
    <div class="login-form">
      <app-input
        name="username"
        type="text"
        placeholder="user name"
        required
        vvas="ユーザーネーム"
        :value="username"
        @updateValue="updateValue"
      />
    </div>
    <div class="login-form">
      <app-input
        name="password"
        type="password"
        placeholder="password"
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
import Cookies from 'js-cookie';
import { Input, Button, Text } from '@Components/atoms';

export default {
  components: {
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  data() {
    return {
      username: '',
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
  },
  created() {
    const token = Cookies.get('user-token');
    if (token) {
      this.$router.push(this.$route.query.redirect || '/');
    } else {
      this.$store.dispatch('signOut');
    }
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    signIn() {
      if (this.disabled) return;
      this.$store.dispatch({
        type: 'signIn',
        username: this.username,
        password: this.password,
      }).then(() => {
        this.$router.push(this.$route.query.redirect || '/');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    color: $errorColor;
  }
  &-button {
    margin-top: 20px;
  }
}
</style>
