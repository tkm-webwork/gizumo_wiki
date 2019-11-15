<template>
  <div class="accordion">
    <li
      :class="classes"
      class="accordion-toggle clearfix"
      @click="accordionToggle()"
    >
      <div class="accordion-toggle__title">
        <slot
          name="title"
        />
      </div>
      <div
        v-if="!isOpened"
        class="accordion-toggle__icon"
      >
        <i class="fas fa-angle-double-down" />
      </div>
      <div
        v-if="isOpened"
        class="accordion-toggle__icon"
      >
        <i class="fas fa-angle-double-up" />
      </div>
    </li>
    <transition
      class="accordion-target"
      name="accordion-target"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-if="isOpened"
        class="accordion-target__content"
      >
        <slot name="body" />
      </div>
    </transition>
  </div>
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
    themeColor: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    borderBottomThemeColor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    classes() {
      return {
        'accordion-toggle-item': true,
        'accordion-toggle-item--flex': this.flex,
        'accordion-toggle-item--space-beetween': this.beetween,
        'accordion-toggle-item--align-items': this.alignItems,
        'accordion-toggle-item--theme-color': this.themeColor,
        'accordion-toggle-item--large': this.large,
        'accordion-toggle-item--border-bottom-theme-color': this.borderBottomThemeColor,
      };
    },
  },
  methods: {
    accordionToggle() {
      this.isOpened = !this.isOpened;
    },
    beforeEnter(el) { // DOMを取得している
      Object.defineProperty(el.style, 'height', {
        value: '0px',
      });
    },
    enter(el) {
      Object.defineProperty(el.style, 'height', {
        value: `${el.scrollHeight}px`,
      });
    },
    beforeLeave(el) {
      Object.defineProperty(el.style, 'height', {
        value: `${el.scrollHeight}px`,
      });
    },
    leave(el) {
      Object.defineProperty(el.style, 'height', {
        value: '0px',
      });
    },
  },
};
</script>
<!-- transitionタグのname = "fade"がenter,leaveの前につく -->
<style lang="postcss" scoped>
  .clearfix::after {
      clear:both;
      display: block;
      content: "";
  }
  .accordion-toggle-item--flex {
    display: flex;
  }
  .accordion-toggle-item--space-beetween {
    justify-content: space-between;
  }
  .accordion-toggle-item--align-items {
    align-items: center;
  }
  .accordion-toggle-item--theme-color {
    color: var(--themeColor);
  }
  .accordion-toggle-item--large {
    padding: 10px;
  }
  .accordion-toggle-item--border-bottom-theme-color {
    border-bottom: 1px solid var(--themeColor);
  }
  /* --------------ここまでclasses---------------------- */
  .accordion {
    overflow: hidden;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity .8s;
    &:hover {
      opacity: 1.0;
    }
  }
  .accordion-toggle {
    display: block;
    width: 100%;
    margin-left: 10px;
    font-size: 30px;
    &__title {
      float: left;
    }
    &__icon {
      float: right;
    }
  }
  .accordion-target {
    &__content {
      transition: height .6s ease-in-out;
      margin-top: 10px;
      margin-left: 18px;
      font-size: 16px;
      justify-content: space-between;
      align-items: center;
    }
  }
  /* -------------ここから変化のcss---------------------- */
  .accordion-target-enter-active{
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-name: accordion--anime__opend;
  }
  .accordion-target-leave-active{
    animation-duration: .5s;
    animation-fill-mode: both;
    animation-name: accordion--anime__opend;
    animation-direction: reverse;
  }
  @keyframes accordion--anime__opend {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
