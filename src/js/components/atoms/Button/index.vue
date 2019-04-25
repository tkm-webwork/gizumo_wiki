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
    large: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    caution: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        'button--block': this.block,
        'button--large': this.large,
        'button--small': this.small,
        'button--round': this.round,
        'button--error': this.error,
        'button--disabled': this.disabled,
        'button--caution': this.caution,
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
}
</style>
