<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :change-edit-category="changeEditCategory"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @clearMessage="clearMessage"
      @handleSubmit="handleSubmit"
      @updateValue="updateValue"
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
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    changeEditCategory() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    const categoryId = this.$route.params.id;
    this.$store.dispatch('categories/getEditCategoryDetail', categoryId);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/changeEditCategory', $event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
