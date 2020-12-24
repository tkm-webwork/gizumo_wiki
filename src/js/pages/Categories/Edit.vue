<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :target-category-name="getCategoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @editCategory="editCategory"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    getCategoryName() {
      const id = this.categoryId;
      const targetCategory = this.$store.getters['categories/categoryList'].filter(val => {
        return id === val.id;
      });
      // 帰ってくるものにあった名前
      return targetCategory[0].name;
    },
    // return id === val.
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.getCategoryName();
    // getters確認して、nカテゴリーリストに何も入ってなかったら、actionでaxiosから全件GETしてくる必要あり。
  },
  methods: {
    editedCategoryName($event) {
      this.$store.dispatch('categories/editedCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    editCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory', this.$route.params);
    },
  },
};
</script>
