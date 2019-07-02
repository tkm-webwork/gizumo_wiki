<template lang="html">
  <router-view />
</template>

<script>
export default {
  computed: {
    parmas() {
      console.log(this.$route.params);
      return this.$route.params;
    },
  },
};
</script>
