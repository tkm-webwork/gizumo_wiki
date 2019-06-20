<template lang="html">
  <textarea
    :class="classes"
    :name="name"
    rows="8"
    :required="required"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('updateValue', $event)"
  />
</template>

<script>
export default {
  props: {
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
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        textarea: true,
        'textarea--white-bg': this.whiteBg,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
/* Defaultスタイル */
.textarea {
  display: block;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  height: 500px;
  font-size: 16px;
  border: 1px solid #ccc;
  transition: all .5s;
  &:focus {
    border-color: var(--themeColor);
  }
}

.textarea--white-bg {
  background-color: #fff;
}
</style>
