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
    underline: {
      type: Boolean,
      default: false,
    },
    keyColor: {
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
    bgKeycolor: {
      type: Boolean,
      default: false,
    },
    bgLightgreen: {
      type: Boolean,
      default: false,
    },
    hoverOpacity: {
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
        'router-link--underline': this.underline,
        'router-link--key-color': this.keyColor,
        'router-link--white': this.white,
        'router-link--round': this.round,
        'router-link--bg-key-color': this.bgKeycolor,
        'router-link--bg-lightgreen': this.bgLightgreen,
        'router-link--hover-opacity': this.hoverOpacity,
      };
    },
  },
};
</script>

<style lang="css" scoped>
.router-link {
  font-size: 16px;
  transition: all .5s;
  &.is-active {
    color: var(--darkerColor);
    font-weight: bold;
    background-color: #fff;
    pointer-events: none;
  }
}
.router-link--hover-opacity {
  @mixin hoverOpacity;
}
.router-link--block {
  display: block;
}
.router-link--large {
  padding: 10px 20px;
}
.router-link--small {
  padding: 5px 15px;
}
.router-link--underline {
  text-decoration: underline;
}
.router-link--key-color {
  color: var(--keycolor);
}
.router-link--bg-key-color {
  background-color: var(--keycolor);
}
.router-link--bg-lightgreen {
  background-color: var(--lightGreen);
}
.router-link--white {
  color: #fff;
}
.router-link--round {
  border-radius: 5px;
}
</style>
