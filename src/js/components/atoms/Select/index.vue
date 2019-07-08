<template>
  <div class="select">
    <div class="select__inner">
      <select
        :class="classes"
        :name="name"
        :value="value"
        @input="$emit('updateValue', $event)"
      >
        <slot />
      </select>
    </div>

    <template v-if="errorMessages">
      <ul>
        <li
          v-for="(error, index) in errorMessages"
          :key="index"
          class="error"
        >
          {{ error }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    errorMessages: {
      type: [String, Array],
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    classes() {
      return {};
    },
  },
};
</script>

<style lang="postcss" scoped>
select {
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid var(--separatorColor);
  transition: all .5s;
  &:focus {
    border-bottom-color: var(--themeColor);
  }
}

.select__inner {
  margin-top: 5px;
  position: relative;
  &:after {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 5px solid var(--themeColor);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: "";
    pointer-events: none;
  }
}
</style>
