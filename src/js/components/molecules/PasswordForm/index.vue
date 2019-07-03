<template>
  <div class="password-form">
    <app-heading :level="1">パスワードの初期化</app-heading>

    <form class="password-form__body" @submit.prevent="handleSubmit">
      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          data-vv-as="今のパスワード"
          name="password"
          type="text"
          placeholder="今のパスワードを入力してください。"
          :error-messages="errors.collect('password')"
          :value="password"
          @updateValue="updateValue"
        />
      </div>

      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          data-vv-as="新しく設定するパスワード"
          name="newPassword"
          type="text"
          placeholder="新しく設定するパスワードを入力してください。"
          :error-messages="errors.collect('newPassword')"
          :value="newPassword"
          @updateValue="updateValue"
        />
      </div>

      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          data-vv-as="新しく設定するパスワードの確認"
          name="confirmNewPassword"
          type="text"
          placeholder="新しく設定するパスワードを再度入力してください。"
          :error-messages="errors.collect('confirmNewPassword')"
          :value="confirmNewPassword"
          @updateValue="updateValue"
        />
      </div>

      <div class="password-form__body__button">
        <app-button
          button-type="submit"
          round
          :disabled="loading ? true : false"
        >
          {{ buttonText }}
        </app-button>
      </div>

      <div v-if="errorMessage" class="password-form__body__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div v-if="doneMessage" class="password-form__body__notice">
        <app-text bg-success>{{ doneMessage }}</app-text>
      </div>
    </form>
  </div>
</template>

<script>
import {
  Heading, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      default: '',
    },
    newPassword: {
      type: String,
      default: '',
    },
    confirmNewPassword: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('updateValue', $event.target);
    },
    handleSubmit() {
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.password-form {
  &__body {
    margin-top: 20px;
    &__input {
      margin-top: 20px;
    }
    &__button {
      margin-top: 20px;
    }
    &__notice {
      margin-top: 20px;
    }
  }
}
</style>
