<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :edit-category-name="editCategoryName"
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
  data: {
    editCategoryName: '',
    editCategoryId: null,
  },
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
    editCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateCategory', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      this.$store.dispatch('categories/editCategory');
    },
  },
};
</script>
