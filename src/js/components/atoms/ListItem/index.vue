<template lang="html">
  <li :class="classes">
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    flex: {
      type: Boolean,
      default: false,
    },
    beetween: {
      type: Boolean,
      default: false,
    },
    alignItems: {
      type: Boolean,
      default: false,
    },
    bgWhite: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    borderBottomGray: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'list-item': true,
        'list-item--flex': this.flex,
        'list-item--space-beetween': this.beetween,
        'list-item--align-items': this.alignItems,
        'list-item--bg-white': this.bgWhite,
        'list-item--large': this.large,
        'list-item--border-bottom-gray': this.borderBottomGray,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
/* Defaultスタイル */
.list-item {
  font-size: 14px;
  text-align: left;
}

/* Unique（For Props）スタイル */
.list-item--flex {
  display: flex;
}
.list-item--space-beetween {
  justify-content: space-between;
}
.list-item--align-items {
  align-items: center;
}
.list-item--bg-white {
  background-color: var(--white);
}
.list-item--large {
  padding: 10px;
}
.list-item--border-bottom-gray {
  border-bottom: 1px solid var(--separatorColor);
}
</style>
