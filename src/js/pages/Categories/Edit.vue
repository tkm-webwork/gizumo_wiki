<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="loading ? true : false"
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
    // categoryId() {
    //   const { id } = this.$store.state.categories.updateCategoryId;
    //   return id;
    // },
    // categoryName() {
    //   const { name } = this.$store.state.categories.updateCategoryName;
    //   return name;
    // },
  },
  created() {
    const { id } = this.$route.params;
    console.log('categoryId:', id);
    this.$store.dispatch('categories/getCategoryDetail', { id });
  },
  methods: {
    // updateValue() {
    //   this.$store.dispatch('categories/editedCategpryName');
    // }
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
      // console.log(this);
    },
    updateCategory() {
      this.$store.dispatch('categories/updateCategory');
      // storeのaction呼び出し
    },
  },
};
</script>
