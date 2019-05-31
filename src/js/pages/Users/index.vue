<template lang="html">
  <router-view />
</template>

<script>
export default {
  watch: {
    $route() {
      this.$store.dispatch('clearMessage');
    },
  },
};
</script>
