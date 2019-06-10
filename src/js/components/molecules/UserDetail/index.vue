<template>
  <section class="users-detail">
    <app-heading :level="1">ユーザー詳細</app-heading>

    <div class="users-detail__back">
      <app-button
        small
        round
        bg-caution
        @click="back"
      >
        戻る
      </app-button>
    </div>

    <div v-if="errorMessage" class="users-detail__error">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div class="users-detail__info">
      <div class="users-detail__info__each">
        <p>ユーザーID</p>
        <p>{{ user.id }}</p>
      </div>
      <div class="users-detail__info__each">
        <p>{{ user.accountname }}</p>
      </div>
      <div class="users-detail__info__each">
        <p>{{ user.name }}</p>
      </div>
      <div class="users-detail__info__each">
        <p>{{ user.email }}</p>
      </div>
      <div class="users-detail__info__each">
        <p>{{ user.role }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { Heading, Button, Text } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appText: Text,
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    back() {
      this.$emit('back');
    },
  },
};
</script>

<style lang="postcss" scoped>
.users-detail {
  &__back {
    margin-top: 20px;
  }
  &__error {
    margin-top: 20px;
  }
  &__info {
    margin-top: 20px;
  }
}
</style>
