<template lang="html">
  <div class="login">
    <div class="login-form">
      <app-input-text
        class-name="login-input"
        label="ユーザー名"
        name="username"
        input-type="text"
        input-required="true"
        :input-value="username"
        @update:username="updateValue"
      />
    </div>
    <div class="login-form">
      <app-input-text
        class-name="login-input"
        label="パスワード"
        name="password"
        input-type="password"
        input-required="true"
        :input-value="password"
        @update:password="updateValue"
      />
    </div>

    <template v-if="errorMessage">
      <div class="login-error">
        <app-text :text="errorMessage" />
      </div>
    </template>

    <div class="login-button">
      <app-button
        :text="loading ? 'サインイン中です...' : 'サインイン'"
        class-name="login-button"
        button-type="button"
        @submitSignin="signIn"
      />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import InputText from '@Components/atoms/InputText';
import Button from '@Components/atoms/Button';
import Text from '@Components/atoms/Text';

export default {
  components: {
    appInputText: InputText,
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
