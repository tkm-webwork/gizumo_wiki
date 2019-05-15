<template lang="html">
  <button
    :class="classes"
    :type="buttonType"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: 'button',
    },
    block: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        'button--block': this.block,
        'button--disabled': this.disabled,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// Defaultスタイル
.button {
  padding: 10px 20px;
  display: inline-block;
  font-size: 16px;
  color: #fff;
  background-color: $keycolor;
  @include hoverOpacity;
}
.button--block {
  display: block;
  width: 100%;
}
.button--disabled {
  background-color: $disabledColor;
  cursor: default;
  &:hover {
    opacity: 1;
  }
}
</style>
