<template lang="html">
  <section class="users-create">
    <app-heading :level="1">ユーザー作成</app-heading>
    <app-button @click="back">戻る</app-button>
  </section>
</template>

<script>
import { Button, Heading } from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
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
