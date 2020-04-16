<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :current-category-name="currentCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @clearMessage="clearMessage"
      @handleSubmit="updateCategory"
      @editedCategory="editedCategory"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  data() {
    return {
      name: '',
    };
  },
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    currentCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', parseInt(this.categoryId, 10));
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
    editedCategory($event) {
      this.$store.dispatch('categories/editedCategory', $event.target.value);
    },
  },
};
</script>
