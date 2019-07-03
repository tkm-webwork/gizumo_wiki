<template lang="html">
  <router-view />
</template>

<script>
export default {
  computed: {
    parmas() {
      console.log(this.$route);
      return this.$route.params;
    },
  },
};
</script>
