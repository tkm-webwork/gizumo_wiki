<template lang="html">
  <div class="wrapper">
    <app-header />
    <div :class="contentClasses">
      <app-sidebar v-if="signedIn" />
      <main :class="contentMainClasses">
        <div class="content-inner">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { Header, Sidebar } from '@Components/globals';

export default {
  components: {
    appHeader: Header,
    appSidebar: Sidebar,
  },
  computed: {
    signedIn() {
      return this.$store.state.auth.signedIn;
    },
    contentClasses() {
      return [
        'content',
        this.$route.name,
      ];
    },
    contentMainClasses() {
      return [
        'content-main',
        this.$route.name,
      ];
    },
  },
  created() {
    const token = Cookies.get('user-token');
    if (token) {
      this.$store.dispatch('checkAuth', { token });
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  padding-top: $headerHight;
  z-index: index($z, 'content');
  &.articlePost,
  &.articleEdit {
    height: 100vh;
  }
  &-main {
    padding-left: $sidebarWidth;
    width: 100%;
    &.signin {
      padding-left: 0;
    }
  }
  &-inner {
    padding: 20px;
    height: 100%;
  }
}
</style>
