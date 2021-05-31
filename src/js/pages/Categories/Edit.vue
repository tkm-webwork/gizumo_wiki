<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :category-id="categoryId"
      :category-name="categoryName"
      @clearMessage="clearMessage"
      @updateCategory="updateCategory"
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
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory(){
      console.log(this);
      this.$store.dispatch('categories/updateCategory');
      // storeのaction呼び出し
    }
  },
};
</script>
