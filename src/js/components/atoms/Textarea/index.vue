<template lang="html">
  <textarea
    :class="['textarea', className]"
    :name="name"
    rows="8"
    :required="required"
    :placeholder="placeholder"
    @input="$emit('updateValue', $event)"
  />
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
.textarea {
  display: block;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  transition: all .5s;
  &:focus {
    border-color: $keycolor;
  }
  &.article-edit-content {
    height: 500px;
    background-color: #fff;
  }
}
</style>
