<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :value="setCategoryName"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
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
    setCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryName', this.$route.params.id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateCategoryName', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
