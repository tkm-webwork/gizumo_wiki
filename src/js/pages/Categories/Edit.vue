<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :disabled="loading ? true : false"
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
    this.$store.dispatch('getCategoryDetail', id);
    this.$store.dispatch('clearMessage');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('editedCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('updateCategory');
    },
  },
};
</script>
