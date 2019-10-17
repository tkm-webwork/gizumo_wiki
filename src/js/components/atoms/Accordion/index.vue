<template lang="html">
  <div class="accordion">
    <button
      class="accordion__title"
      :class="{'isOpen': isOpen}"
      @click="accordionToggle"
    >
      <slot name="title" />
    </button>
    <transition
      name="accordion__action"
      @before-enter="beforeEnter"
      @enter="enter"
      @enter-cancelled="enterCancelled"
      @before-leave="beforeLeave"
      @leave="leave"
      @leave-cancelled="leaveCancelled"
    >
      <div
        v-if="isOpen"
        class="accordion__content"
      >
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    accordionToggle() {
      this.isOpen = !this.isOpen;
    },
    beforeEnter(el) {
      const value = 0;
      Object.defineProperty(el.style, 'height', { value });
    },
    enter(el) {
      const value = `${el.scrollHeight}px`;
      Object.defineProperty(el.style, 'height', { value });
    },
    enterCancelled(el) {
      const value = 0;
      Object.defineProperty(el.style, 'height', { value });
    },
    beforeLeave(el) {
      const value = `${el.scrollHeight}px`;
      Object.defineProperty(el.style, 'height', { value });
    },
    leave(el) {
      const value = 0;
      Object.defineProperty(el.style, 'height', { value });
    },
    leaveCancelled(el) {
      const value = 0;
      Object.defineProperty(el.style, 'height', { value });
    },
  },
};
</script>

<style lang="postcss" scoped>
.accordion {
  background-color: #fff;
  border-color: #fff;
  border-style: solid;
  border-radius: 5px;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  width: 100%;

  &__title {
    position: relative;
    display: block;
    background-color: var(--themeColor);
    color: #ffffff;
    width: 100%;
    transition: all 0.2s ease-in;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    box-sizing: border-box;
    &:after {
     display: inline-block;
     width: 0;
     height: 0;
     border: 8px solid transparent;
     content: "";
     border-top-color: #fff;
     position: absolute;
     top: 50%;
     right: 1em;
     margin-top: -5px;
     transition: all 0.2s ease-in;
    }
    &.isOpen {
      border-radius: 5px 5px 0 0;
      &:after {
        transform: rotateX(180deg);
        margin-top: -13px;
      }
    }
  }
  &__action {
    &-enter-active {
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: accordion__action--open;
    }
    &-leave-active {
      animation-duration: 50ms;
      animation-fill-mode: both;
      animation-name: accordion__action--close;
    }
  }

  &__content {
    background-color: #f5f5f5;
    transition: all 0.2s ease-in;
  }
}

@keyframes accordion__action--open {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes accordion__action--close {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
