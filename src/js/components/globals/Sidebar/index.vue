<template lang="html">
  <aside class="sidebar">
    <app-sidebar-list
      class-name="sidebar-list"
      :target-array="routeLinksArray"
    />
  </aside>
</template>

<script>
import routeLinksArray from '@Helpers/routeLinksArray';
import { SidebarList } from '@Components/molecules';

export default {
  components: {
    appSidebarList: SidebarList,
  },
  computed: {
    routeLinksArray() {
      return routeLinksArray;
    },
  },
};
</script>

<style lang="postcss" scoped>
.sidebar {
  position: fixed;
  top: var(--headerHight);
  left: 0;
  padding: 10px;
  width: var(--sidebarWidth);
  height: 100%;
  color: #fff;
  text-align: center;
  background-color: var(--subthemeColor);
  z-index: var(--z-sidebar);
}
</style>
