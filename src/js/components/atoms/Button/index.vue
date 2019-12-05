<template lang="html">
  <button
    :class="classes"
    :type="buttonType"
    @click="$emit('click', $event)"
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
    small: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
    themeColor: {
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
    bgCaution: {
      type: Boolean,
      default: false,
    },
    bgWhite: {
      type: Boolean,
      defualt: false,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    bgWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        button: true,
        'button--block': this.block,
        'button--small': this.small,
        'button--round': this.round,
        'button--bold': this.bold,
        'button--theme-color': this.themeColor,
        'button--disabled': this.disabled,
        'button--danger': this.bgDanger,
        'button--bg-caution': this.bgCaution,
        'button--bg-white': this.bgWhite,
        'button--pointer': this.pointer,
        'button--pagination': this.pagination,
        'button--bg-width': this.bgWidth,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
/* Defaultスタイル */
.button {
  padding: 8px 20px;
  display: inline-block;
  font-size: 16px;
  line-height: 1.4;
  color: #fff;
  background-color: var(--themeColor);
  @mixin hoverOpacity;
}

.button--block {
  display: block;
  width: 100%;
}
.button--small {
  padding: 5px 12px;
  font-size: 14px;
}
.button--round {
  border-radius: 5px;
}
.button--bold {
  font-weight: var(--bold);
}
.button--theme-color {
  color: var(--themeColor);
}
.button--danger {
  background-color: var(--errorColor);
}
.button--bg-caution {
  background-color: var(--cautionColor);
}
.button--bg-white {
  background-color: #fff;
}
.button--pagination {
  margin: 0 2px;
  padding: 0;
  background: var(--themeColor);
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  color: #fff;

  &:hover,
  &:active {
    color: var(--themeColor);
    background: #fff;
    border: 1px solid var(--themeColor);
    border-radius: 10px;
  }
}
.button--disabled {
  background-color: var(--disabledColor);
  cursor: default;
  &:hover {
    opacity: 1;
  }
}
.button--pointer {
  cursor: pointer;
}
.button--bg-width {
  width: 80px;
}
</style>
