<template>
  <section class="users-create">
    <app-heading :level="1">ユーザー作成</app-heading>
    <div class="users-create__back">
      <app-button
        small
        round
        bg-caution
        @click="back"
      >
        戻る
      </app-button>
    </div>

    <form class="users-create__form" @submit.prevent="createUser">
      <div class="users-create__input">
        <app-input
          v-validate="'required'"
          name="name"
          type="text"
          placeholder="ユーザー名"
          data-vv-as="ユーザー名"
          :error-messages="errors.collect('name')"
          :value="name"
          @updateValue="updateValue"
        />
      </div>
      <div class="users-create__input">
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
      <div class="users-create__input">
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

      <div class="users-create__error">
        <div v-if="errorMessage">
          <app-text bg-error>{{ errorMessage }}</app-text>
        </div>
      </div>

      <div class="users-create__button">
        <app-button
          button-type="submit"
          :disabled="loading ? true : false"
          block
        >
          <template v-if="loading">
            <span>作成中です...</span>
          </template>
          <template v-else>
            <span>作成</span>
          </template>
        </app-button>
      </div>
    </form>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appText: Text,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  methods: {
    back() {
      this.$emit('back');
    },
    updateValue($event) {
      this.$emit('updateValue', $event.target);
    },
    createUser() {
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('createUser');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.users-create {
  &__back {
    margin-top: 20px;
  }
  &__form {
    margin-top: 20px;
  }
  &__input {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
  }
  &__error {
    margin-top: 20px;
  }
  &__button {
    margin-top: 20px;
  }
}
</style>
