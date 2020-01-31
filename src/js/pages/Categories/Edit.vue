<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :update-category-name="updateCategoryName"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="editCategory"
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
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    // インスタンスが作成されてからメソッドが実行できるのと、ライフサイクルの中で1番早いタイミングでhttp通信を行う
    const categoryId = this.$route.params.id;
    this.$store.dispatch('categories/getCategory', categoryId);
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateCategoryName', $event.target.value);
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    editCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/editCategory');
    },
  },
};
</script>
