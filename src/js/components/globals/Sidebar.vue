<template lang="html">
  <aside class="sidebar">
    <app-list
      class-name="sidebar-list"
      :target-array="routeLinksArray"
    />
  </aside>
</template>

<script>
import routeLinksArray from '@Helpers/routeLinksArray';
import List from '@Components/molecules/ListSidebar';

export default {
  components: {
    appList: List,
  },
  computed: {
    routeLinksArray() {
      return routeLinksArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 10px;
  min-width: 200px;
  color: #fff;
  text-align: center;
  background-color: $darkerColor;
}
</style>
