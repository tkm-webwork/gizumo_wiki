<template lang="html">
  <p :class="className">{{ text }}</p>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'text',
    },
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
