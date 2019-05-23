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
    bgDanger: {
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
        'button--danger': this.bgDanger,
      };
    },
  },
};
</script>

<style lang="css" scoped>
/* Defaultスタイル */
.button {
  padding: 10px 20px;
  display: inline-block;
  font-size: 16px;
  color: #fff;
  background-color: var(--keycolor);
  @mixin hoverOpacity;
}

.button--block {
  display: block;
  width: 100%;
}
.button--disabled {
  background-color: var(--disabledColor);
  cursor: default;
  &:hover {
    opacity: 1;
  }
}
.button--danger {
  background-color: var(--errorColor);
}
</style>
