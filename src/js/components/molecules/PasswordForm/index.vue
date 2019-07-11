<template>
  <div class="password-form">
    <app-heading :level="1">{{ headingText }}</app-heading>

    <form class="password-form__body" @submit.prevent="handleSubmit">
      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          name="password"
          type="password"
          placeholder="現在のパスワードを入力してください。"
          data-vv-as="現在のパスワード"
          :error-messages="errors.collect('password')"
          :value="password"
          @updateValue="updateValue"
        />
      </div>

      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          name="newPassword"
          type="password"
          placeholder="新しく設定するパスワードを入力してください。"
          data-vv-as="新しく設定するパスワード"
          :error-messages="errors.collect('newPassword')"
          :value="newPassword"
          @updateValue="updateValue"
        />
      </div>

      <div class="password-form__body__input">
        <app-input
          v-validate="'required'"
          name="confirmNewPassword"
          type="password"
          placeholder="新しく設定するパスワードを再度入力してください。"
          data-vv-as="新しく設定するパスワードの確認"
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
    </form>

    <div v-if="errorMessage" class="password-form__body__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="password-form__body__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
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
    headingText: {
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
  data() {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    handleSubmit() {
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$emit('handleSubmit', {
            password: this.password,
            new_password: this.newPassword,
            new_password_confirm: this.confirmNewPassword,
          });
        }
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
