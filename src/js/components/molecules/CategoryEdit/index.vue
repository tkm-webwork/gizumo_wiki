<template lang="html">
  <form @submit.prevent="handleSubmit">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-router-link
      class="category-management-edit__link"
      block
      underline
      key-color
      hover-opacity
      to="/categories"
    >
      カテゴリー一覧へ戻る
    </app-router-link>
    <!-- v-validateはシングルクォートで囲んで文字列であると伝える必要がある -->
    <!-- data-vv-asで項目名を日本語で表示させる -->
    <!-- errorMessagesと紐付け -->
    <!-- 多分fieldNameはname属性と同じで動作するはず -->
    <!-- inputコンポーネントで使用しているupdateValueという値を使い回す -->
    <app-input
      class="category-management-edit__input"
      name="updateCategory"
      type="text"
      placeholder="カテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :value="updateCategoryName"
      v-validate="'required'"
      :error-messages="errors.collect('updateCategory')"
      @updateValue="$emit('updateValue', $event)"
    />
    <app-button
      class="category-management-edit__submit"
      button-type="submit"
      round
      :disabled="disabled || !access.edit"
    >
      {{ buttonText }}
    </app-button>

    <!-- v-ifで分岐させないと表示が残る -->
    <div v-if="errorMessage" class="category-management-edit__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <!-- v-ifで分岐 -->
    <div v-if="doneMessage" class="category-management-edit__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>
<script>
import {
  Heading, Input, Button, RouterLink, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appRouterLink: RouterLink,
    appText: Text,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    // 成功時,エラー時のメッセージの受け取り
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    // 初期段階のカテゴリー名を表示する値の受け取り
    updateCategoryName: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '更新中...' : '更新';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        // ボタンを押した際にバリデートが走る
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
.category-management-edit {
  &__title {
    margin-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__link {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
