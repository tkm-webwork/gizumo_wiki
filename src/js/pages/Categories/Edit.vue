<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :category-name="categoryName"
      @clearMessage="clearMessage"
      @editedCategoryName="editedCategoryName"
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
    categoryName() {
      return this.$store.state.categories.targetCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryName', parseInt(this.categoryId, 10));
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    editedCategoryName($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
  },
};
</script>
