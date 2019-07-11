<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :disabled="loading ? true : false"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :access="access"
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
  props: {
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
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
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
