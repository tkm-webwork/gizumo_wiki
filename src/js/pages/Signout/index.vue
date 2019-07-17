<template lang="html">
  <app-notice
    :notice-text="signoutMessage"
    link-path="/signin"
    link-text="サインインする"
  />
</template>

<script>
import { Notice } from '@Components/molecules';

export default {
  components: { appNotice: Notice },
  props: {
    signoutMessage: {
      type: String,
      default: 'サインイン有効期限が切れました。再度サインインしてください。',
    },
  },
  created() {
    this.$store.dispatch('auth/signOut');
  },
};
</script>
