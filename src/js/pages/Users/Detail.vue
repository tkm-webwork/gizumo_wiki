<template lang="html">
  <section class="users-detail">
    <app-heading :level="1">ユーザー詳細</app-heading>
    <app-button small round @click="back">戻る</app-button>
    <div>
      <p>{{ user.id }}</p>
      <p>{{ user.accountname }}</p>
      <p>{{ user.username }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.role }}</p>
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
</style>
