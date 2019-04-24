<template lang="html">
  <input
    :class="classes"
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
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        input: true,
        'input--white-bg': this.whiteBg,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// Defaultスタイル
.input {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  transition: all .5s;
  &:focus {
    border-bottom-color: $keycolor;
  }
}

.input--white-bg {
  background-color: #fff;
}
</style>
