<template lang="html">
  <button
    :class="['button', className]"
    :type="buttonType"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'ボタン',
    },
    className: {
      type: String,
      default: '',
    },
    buttonType: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 10px 15px;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: $keycolor;
  &.login-button {
    @include hoverOpacity;
  }
}
</style>
