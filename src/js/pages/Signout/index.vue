<template lang="html">
  <div class="signout">
    <app-text ex-large>
      {{ signoutMessage }}
    </app-text>

    <div class="signout__link">
      <app-router-link to="/signin" underline key-color>
        サインインする
      </app-router-link>
    </div>
  </div>
</template>

<script>
import { Text, RouterLink } from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appRouterLink: RouterLink,
  },
  props: {
    signoutMessage: {
      type: String,
      default: 'サインイン有効期限が切れました。再度サインインしてください。',
    },
  },
  created() {
    this.$store.dispatch('signOut');
  },
  // computed: {
  //   signoutMessage() {
  //     return this.$store.state.auth.token
  //       ? 'サインアウトしました。'
  //       : '再度ログインしてください。';
  //   },
  // },
};
</script>

<style lang="postcss" scoped>
.signout {
  margin-top: 80px;
  width: 100%;
  text-align: center;
  &__link {
    margin-top: 40px;
  }
}
</style>
