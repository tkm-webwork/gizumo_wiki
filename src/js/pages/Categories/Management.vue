<template lang="html">
  <div class="category-management">
    <section class="category-management-post">
      <app-category-post
        :category="category"
        :disabled="loading ? true : false"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        @udpateValue="updateValue"
        @clearMessage="clearMessage"
        @handleSubmit="handleSubmit"
      />
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @openModal="openModal"
        @handleClick="handleClick"
      />
    </section>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      category: '',
      theads: ['カテゴリー名', '', '', ''],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryId() {
      return this.$store.state.categories.deleteCategoryId;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategoris', this.category)
        .then(() => {
          // categoryの値を初期化する
          this.category = '';
          // 新しくなったカテゴリーの配列を取得する
          this.$store.dispatch('categories/getAllCategories');
        });
    },
    handleClick() {
      const categoryId = this.$store.state.categories.deleteCategoryId;
      this.$store.dispatch('categories/deleteCategory', categoryId)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
        });
      this.toggleModal();
    },
    openModal(categoryId, categoryName) {
      this.toggleModal();
      this.$store.dispatch('categories/setDeleteValue', { categoryId, categoryName });
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-management {
  display: flex;
  height: calc(100vh - 94px);
  &-post {
    padding-right: 2%;
    width: 38%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
  }
}
</style>
