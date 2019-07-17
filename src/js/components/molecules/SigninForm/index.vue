<template lang="html">
  <form class="login" @submit.prevent="handleSubmit">
    <div class="login-form">
      <app-input
        v-validate="'required|email'"
        name="email"
        type="text"
        placeholder="メールアドレス"
        data-vv-as="メールアドレス"
        :error-messages="errors.collect('email')"
        :value="email"
        @updateValue="updateValue"
      />
    </div>
    <div class="login-form">
      <app-input
        v-validate="'required'"
        name="password"
        type="password"
        placeholder="パスワード"
        data-vv-as="パスワード"
        :error-messages="errors.collect('password')"
        :value="password"
        @updateValue="updateValue"
      />
    </div>

    <div class="login-button">
      <app-button
        class-name="login-button"
        button-type="submit"
        :disabled="loading"
        block
      >
        {{ buttonText }}
      </app-button>
    </div>

    <template v-if="errorMessage">
      <div class="login-error">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>
    </template>
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
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      return this.loading ? 'サインイン中です...' : 'サインイン';
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('updateValue', $event.target);
    },
    handleSubmit() {
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
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
  }
  &-button {
    margin-top: 20px;
  }
}
</style>
