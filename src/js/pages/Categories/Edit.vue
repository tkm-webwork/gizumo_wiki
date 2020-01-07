<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :update-category-name="updateCategoryName"
      :access="access"
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
    this.$store.dispatch('categories/getCategoryDetail', this.$route.params);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
  },
};

</script>
