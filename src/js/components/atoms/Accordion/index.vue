<template>
  <div class="accordion">
    <div class="accordion__title">
      <slot name="title" />
    </div>
    <div class="accordion__content">
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
};
</script>

<style scoped>

</style>
