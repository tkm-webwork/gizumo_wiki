<template lang="html">
  <header class="header">
    <app-router-link>MENUを開く</app-router-link>
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
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  background-color: $keycolor;
  z-index: index($z, 'header');
}
</style>
