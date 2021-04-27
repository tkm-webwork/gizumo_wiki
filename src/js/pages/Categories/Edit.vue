<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :update-category-name="updateCategoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @handleSubmit="updateHandleSubmit"
      @editedName="editedName"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      id: '',
      name: '',
    };
  },
  computed: {
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', { id });
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    editedName($event) {
      this.$store.dispatch('categories/editedName', $event.target.value);
    },
    updateHandleSubmit() {
      const { id } = this.$route.params;
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', { id });
    },
  },
};
</script>
