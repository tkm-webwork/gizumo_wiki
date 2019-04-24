<template lang="html">
  <router-link
    :to="{ path: to }"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classes"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
    activeClass: {
      type: String,
      default: '',
    },
    exactActiveClass: {
      type: String,
      default: '',
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
    underLine: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'router-link': true,
        'router-link--block': this.block,
        'router-link--large': this.large,
        'router-link--small': this.small,
        'router-link--under-line': this.underLine,
        'router-link--white': this.white,
        'router-link--round': this.round,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link {
  font-size: 16px;
  transition: all .5s;
  &.is-active {
    color: $darkerColor;
    font-weight: bold;
    background-color: #fff;
  }
}
.router-link--block {
  display: block;
}
.router-link--large {
  padding: 7px 10px;
}
.router-link--small {
  padding: 5px;
}
.router-link--under-line {
  text-decoration: underline;
}
.router-link--white {
  color: #fff;
}
.router-link--round {
  border-radius: 5px;
}
</style>
