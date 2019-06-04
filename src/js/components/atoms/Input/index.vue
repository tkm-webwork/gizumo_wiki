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
    <!-- <span class="error">{{ errors.first(name) }}</span> -->

    <!-- エラーの表示、下で対応できればしてほしい -->
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

<style lang="css" scoped>
/* Defaultスタイル */
.input {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  transition: all .5s;
  &:focus {
    border-bottom-color: var(--themeColor);
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
