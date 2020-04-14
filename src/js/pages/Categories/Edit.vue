<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :update-category-name="updateCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @udpateValue="updateValue"
      @clearMessage="clearMessage"
      @handleSubmit="updateCategory"
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
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', id);
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
