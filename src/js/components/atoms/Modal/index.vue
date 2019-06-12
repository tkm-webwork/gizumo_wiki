<template>
  <div
    class="modal-wrapper"
    :class="{'modal-wrapper-is-show': isOpen}"
  >
    <div
      class="modal-overlay"
      @click="handleToggleModal"
    />
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  beforeMount() {
    this.$root.$on('toggleModal', this.handleToggleModal);
  },
  methods: {
    handleToggleModal() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style lang="postcss" scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: all .5s;
    &-is-show {
      pointer-events: auto;
      opacity: 1;
    }
  }
  .modal-overlay {
    background-color: rgba(0,0,0, .7);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .modal-content {
    position: absolute;
    padding: 10px;
    background-color: var(--white);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 400px;
    min-height: 300px;
    z-index: 30;
  }
</style>
