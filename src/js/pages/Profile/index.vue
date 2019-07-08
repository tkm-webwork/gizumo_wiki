<template lang="html">
  <app-profile :user="user" />
</template>

<script>
import { Profile } from '@Components/molecules';

export default {
  components: {
    appProfile: Profile,
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
