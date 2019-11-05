<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :update-category-name="updateCategoryName"
      @clearMessage="clearMessage"
      @updateCategory="updateCategory"
      @updateValue="editedCategory"
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
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    const categoryId = this.$route.params.id;
    this.$store.dispatch('categories/getCategory', parseInt(categoryId, 10));
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    editedCategory($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
    updateCategory() {
      const categoryId = this.$route.params.id;
      const categoryName = this.updateCategoryName;
      this.$store.dispatch('categories/updateCategory', { categoryId, categoryName });
    },
  },
};
</script>
