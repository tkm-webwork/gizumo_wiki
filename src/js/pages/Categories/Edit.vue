<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
      :update-category-name="updateCategoryName"
      :err-message="errMessage"
      :done-message="doneMessage"
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
    errMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
