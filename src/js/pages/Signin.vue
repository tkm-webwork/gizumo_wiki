<template lang="html">
  <div class="login">
    <div class="login-form">
      <app-input-text
        class-name="login-input"
        label="ユーザー名"
        name="username"
        input-type="text"
        input-required="true"
        :input-value="usernameValue"
        @update:username="updateValue"
      />
    </div>
    <div class="login-form">
      <app-input-text
        class-name="login-input"
        label="パスワード"
        name="password"
        input-type="password"
        input-require="true"
        :input-value="passwordValue"
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
        text="サインイン"
        class-name="login-button"
        button-type="button"
        @submitSignin="submitSignin"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputText from '@Components/atoms/InputText';
import Button from '@Components/atoms/Button';
import Text from '@Components/atoms/Text';

export default {
  components: {
    appInputText: InputText,
    appButton: Button,
    appText: Text,
  },
  computed: mapState({
    usernameValue: state => state.auth.username,
    passwordValue: state => state.auth.password,
    errorMessage: state => state.auth.errorMessage,
  }),
  methods: {
    updateValue($event) {
      this.$store.dispatch({
        type: 'updateValue',
        name: $event.target.name,
        value: $event.target.value,
      });
    },
    submitSignin() {
      this.$store.dispatch({
        type: 'submitSignin',
        username: this.$store.state.auth.username,
        password: this.$store.state.auth.password,
      }).then(() => {
        this.$router.push(this.$route.query.redirect);
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
