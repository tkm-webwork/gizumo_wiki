<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :update-category-name="updateCategoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @handleSubmit="updateCategory"
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
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryName', id);
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      this.$store.dispatch('categories/updateCategory');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
  },
};
</script>
