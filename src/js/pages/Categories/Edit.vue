<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      @clearMessage="clearMessage"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :update-category-name="updateCategoryName"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    // 成功時、エラー時のメッセージ
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    }
  },
  // 更新対象の情報の取得
  // created段階で実行
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
