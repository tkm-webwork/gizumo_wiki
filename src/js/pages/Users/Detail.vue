<template lang="html">
  <section class="users-detail">
    <app-heading :level="1">ユーザー詳細</app-heading>
    {{ user }}
  </section>
</template>

<script>
import { Heading } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
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
};
</script>

<style lang="css" scoped>
</style>
