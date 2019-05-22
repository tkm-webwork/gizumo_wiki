<template lang="html">
  <li :class="classes">
    <slot />
  </li>
</template>

<script>
export default {
  computed: {
    classes() {
      return {
        'list-item': true,
      };
    },
  },
};
</script>

<style lang="css" scoped>
/* Defaultスタイル */
.list-item {
  font-size: 14px;
  text-align: left;
}
</style>
