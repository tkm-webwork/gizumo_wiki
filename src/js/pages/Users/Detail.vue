<template lang="html">
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
        <p>{{ user.username }}</p>
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
import { Heading, Button } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('getUser', { id });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="css" scoped>
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
