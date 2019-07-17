<template>
  <section class="users-detail">
    <app-heading :level="1">ユーザー詳細</app-heading>

    <div class="users-detail__back">
      <app-router-link
        block
        underline
        key-color
        hover-opacity
        to="/users"
      >
        ユーザー一覧へ戻る
      </app-router-link>
    </div>

    <form class="users-detail__info" @submit.prevent="editUser">
      <div class="users-detail__info__row">
        <div class="users-detail__info__row__title">
          <app-text theme-color bold>名前</app-text>
        </div>
        <div class="users-detail__info__row__content">
          <app-input
            v-validate="'required'"
            name="fullName"
            type="text"
            placeholder="名前"
            data-vv-as="名前"
            :error-messages="errors.collect('fullName')"
            :value="user.fullName"
            @updateValue="updateValue"
          />
        </div>
      </div>
      <div class="users-detail__info__row">
        <div class="users-detail__info__row__title">
          <app-text theme-color bold>アカウント名</app-text>
        </div>
        <div class="users-detail__info__row__content">
          <app-input
            v-validate="'required'"
            name="accountName"
            type="text"
            placeholder="アカウント名"
            data-vv-as="アカウント名"
            :error-messages="errors.collect('accountName')"
            :value="user.accountName"
            @updateValue="updateValue"
          />
        </div>
      </div>
      <div class="users-detail__info__row">
        <div class="users-detail__info__row__title">
          <app-text theme-color bold>メールアドレス</app-text>
        </div>
        <div class="users-detail__info__row__content">
          <app-input
            v-validate="'required|email'"
            name="email"
            type="text"
            placeholder="メールアドレス"
            data-vv-as="メールアドレス"
            :error-messages="errors.collect('email')"
            :value="user.email"
            @updateValue="updateValue"
          />
        </div>
      </div>

      <div class="users-detail__info__row">
        <div class="users-detail__info__row__title">
          <app-text theme-color bold>権限</app-text>
        </div>
        <div class="users-detail__info__row__content">
          <app-select
            v-validate="'required'"
            name="role"
            data-vv-as="権限"
            :error-messages="errors.collect('role')"
            :value="user.role"
            @updateValue="updateValue"
          >
            <option
              v-for="(role, index) in options"
              :key="index"
              :value="role.value"
              :selected="user.role === role.value"
            >
              {{ role.name }}
            </option>
          </app-select>
        </div>
      </div>

      <div v-if="cautionMessage" class="users-detail__info__row">
        <app-text ex-small>{{ cautionMessage }}</app-text>
      </div>

      <div class="users-detail__info__submit">
        <app-button
          button-type="submit"
          :disabled="disabled || !access.edit"
          round
        >
          {{ buttonText }}
        </app-button>
      </div>
    </form>

    <div v-if="errorMessage" class="users-detail__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="users-detail__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </section>
</template>

<script>
import {
  Heading,
  Button,
  Text,
  Input,
  Select,
  RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appText: Text,
    appInput: Input,
    appSelect: Select,
    appRouterLink: RouterLink,
  },
  props: {
    cautionMessage: {
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
    user: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中です...' : '更新';
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('updateValue', $event.target);
    },
    editUser() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('editUser');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.users-detail {
  &__back {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
  &__info {
    margin: 0 auto;
    margin-top: 20px;
    width: 80%;
    &__row {
      display: flex;
      align-items: center;
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
      &__title {
        width: 20%;
        text-align: right;
      }
      &__content {
        margin-left: 10%;
        width: 70%;
      }
    }
    &__submit {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>
