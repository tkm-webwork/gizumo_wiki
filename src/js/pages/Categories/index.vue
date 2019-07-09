<template lang="html">
  <router-view :access="access" />
</template>

<script>
export default {
  props: {
    access: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
