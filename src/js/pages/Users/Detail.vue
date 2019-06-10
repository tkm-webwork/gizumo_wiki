<template lang="html">
  <app-user-detail
    :error-message="errorMessage"
    :user="user"
    @back="back"
  />
</template>

<script>
import { UserDetail } from '@Components/molecules';

export default {
  components: {
    appUserDetail: UserDetail,
  },
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
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
