<template lang="html">
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-heading
      class="category-management-post-title"
      :level="2"
    >
      新規カテゴリーの作成
    </app-heading>
    <app-input
      class="category-management-post-input"
      required
      type="text"
      name="category"
      placeholder="カテゴリー名を入力してください"
      data-vv-as="カテゴリー"
      :error-messages="errors.collect('category')"
      :value="category"
      @updateValue="$emit('udpateValue', $event)"
    />
    <app-button
      class="category-management-post-submit"
      button-type="submit"
      round
      :disabled="loading ? true : false"
      @click="$emit('handleSubmit')"
    >
      {{ buttonText }}
    </app-button>
  </div>
</template>
<script>
import { Heading, Input, Button } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
  },
  props: {
    category: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      return this.loading ? '作成中....' : '作成';
    },
  },
};
</script>
<style scoped>
.category-management-post-title {
  margin-top: 16px;
}
.category-management-post-input {
  margin-top: 16px;
}
.category-management-post-submit {
  margin-top: 16px;
}
</style>
