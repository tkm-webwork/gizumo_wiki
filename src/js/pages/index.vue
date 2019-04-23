<template lang="html">
  <div class="wrapper">
    <app-header />
    <div class="content">
      <app-sidebar v-if="signedIn" />
      <main class="content-main">
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
  height: 100vh;
  &-main {
    padding-left: $sidebarWidth;
    width: 100%;
  }
  &-inner {
    padding: 20px;
    height: 100%;
  }
}
</style>
