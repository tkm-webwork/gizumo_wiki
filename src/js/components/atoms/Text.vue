<template lang="html">
  <p>
    {{ text }}
  </p>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 16px;
}
</style>
