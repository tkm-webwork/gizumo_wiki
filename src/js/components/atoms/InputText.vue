<template lang="html">
  <div class="inputText">
    <p class="inputText-label">{{ label }}</p>
    <input
      :class="['inputText-input', className]"
      :name="name"
      :type="inputType"
      :required="inputRquired"
      :value="inputValue"
      @input="$emit(`update:${name}`, $event)"
    >
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    className: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'inputName',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputRquired: {
      type: Boolean,
      default: true,
    },
    inputValue: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.inputText {
  &-label {
    font-weight: bold;
    font-size: 18px;
  }
  &-input {
    margin-top: 5px;
    padding: 10px;
    width: 100%;
    font-size: 18px;
    &.login-input {
      border-bottom: 1px solid #ccc;
      transition: all .5s;
      &:focus {
        border-bottom-color: $keycolor;
      }
    }
  }
}
</style>
