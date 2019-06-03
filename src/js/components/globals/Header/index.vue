<template lang="html">
  <header class="header">
    <app-router-link v-if="signedIn">MENUを開く</app-router-link>
    <app-heading class-name="header__title">
      Gizumo Wiki
    </app-heading>
  </header>
</template>

<script>
import { Heading, RouterLink } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
  },
  computed: {
    signedIn() {
      return this.$store.state.auth.signedIn;
    },
  },
};
</script>

<style lang="css" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: var(--themeColor);
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .6);
  z-index: var(--z-header);
}
</style>
