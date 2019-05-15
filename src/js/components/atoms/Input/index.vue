<template lang="html">
  <div>
    <input
      v-validate="required ? 'required' : false"
      :data-vv-as="displayFields"
      :class="classes"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('updateValue', $event)"
    >
    <span class="error">{{ errors.first(name) }}</span>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    name() {
      return this.name;
    },
  },
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
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
    vvas: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return {
        input: true,
        'input--white-bg': this.whiteBg,
      };
    },
    displayFields() {
      if (this.vvas === '') return this.name;
      return this.vvas;
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

.error {
  color: red;
  display: inline-block;
  margin-top: 10px;
}

.input--white-bg {
  background-color: #fff;
}
</style>
