<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :target-category-name="getCategoryName"
      @clearMessage="clearMessage"
      @editCategoryName="editCategoryName"
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
    getCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    // getCategoryName() {
    //   const id = this.categoryId;
    //   const targetCategory = this.$store.getters['categories/categoryList']
    //     .filter(val => {
    //       return id === val.id;
    //     });
    //   return targetCategory[0].name;
    // },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryName', id);
    // if ( this.$store.state.categories.errorMessage !== '') {

    // }
    // this.getCategoryName();
    // getters確認して、nカテゴリーリストに何も入ってなかったら、actionでaxiosから全件GETしてくる必要あり。
  },
  methods: {
    editCategoryName($event) {
      this.$store.dispatch('categories/editCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', this.$route.params);
    },

    // this.$store.dispatch('categories/targetCategory', categoryName);
  },
};
</script>
