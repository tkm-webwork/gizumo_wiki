<template lang="html">
  <div>
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-heading
      class="category-management-edit-title"
      :level="2"
    >
      カテゴリーの更新
    </app-heading>
    <app-input
      class="category-management-edit-input"
      required
      type="text"
      name="updateCategory"
      placeholder="カテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors"
      :value="updateCategoryName"
      @updateValue="$emit('udpateValue', $event)"
    />
    <app-button
      class="category-management-edit-submit"
      button-type="submit"
      round
      :disabled="disabled ? true : false"
      @click="$emit('handleSubmit')"
    >
      {{ buttonText }}
    </app-button>
    <app-router-link
      class="category-management-edit-link"
      block
      underline
      key-color
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
  </div>
</template>
<script>
import {
  Heading, Input, Button, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
  },
  props: {
    updateCategoryName: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      return this.loading ? '更新中...' : '更新';
    },
  },
};
</script>
<style scoped>
.category-management-edit-title {
  margin-top: 16px;
}
.category-management-edit-input {
  margin-top: 16px;
}
.category-management-edit-submit {
  margin-top: 16px;
}
.category-management-edit-link {
  margin-top: 16px;
}
</style>
