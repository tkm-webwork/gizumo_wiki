<template lang="html">
  <li :class="classes">
    <div
      :class="['accordion__title', isShow ? 'show' : 'hide']"
      @click="toggleAccordion"
    >
      <slot name="title" />
    </div>
    <transition
      name="slide"
    >
      <div v-show="isShow">
        <slot name="content" />
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  props: {
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
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    classes() {
      return {
        accordion: true,
        'accordion--bg-white': this.bgWhite,
        'accordion--large': this.large,
        'accordion--border-bottom-gray': this.borderBottomGray,
      };
    },
  },
  methods: {
    toggleAccordion() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="postcss" scoped>
/* Defaultスタイル */
.accordion {
  font-size: 14px;
  text-align: left;
}
/* Unique（For Props）スタイル */
.accordion--bg-white {
  background-color: var(--white);
}
.accordion--large {
  padding: 10px;
}
.accordion--border-bottom-gray {
  border-bottom: 2px solid var(--separatorColor);
}
.accordion__title {
  margin-top: 16px;
  color: var(--textLinkColor);
  cursor: pointer;
}
.slide-enter-active,
.slide-leave-active {
   transition: .7s ease;
}
.slide-enter-to, .slide-leave {
   max-height: 100vh;
   overflow: hidden;
}
.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
.hide,.show {
  position: relative;
}
.hide::after,
.show::after {
  position: absolute;
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--textLinkColor);
  border-bottom: 2px solid var(--textLinkColor);
  content: '';
  transition: transform .5s;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}
.show::after {
  transform: rotate(45deg);
}
.hide::after {
  transform: rotate(-45deg);
}
</style>
