<template lang="html">
  <input
    :class="['input', className]"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :value="value"
    @input="$emit('updateValue', $event)"
  >
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'inputName',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '入力してください',
    },
    required: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  &.login-input,
  &.article-edit-title {
    border-bottom: 1px solid #ccc;
    transition: all .5s;
    &:focus {
      border-bottom-color: $keycolor;
    }
  }
  &.article-edit-title {
    background-color: #fff;
  }
}
</style>
