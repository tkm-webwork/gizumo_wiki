<template lang="html">
  <div class="category-management">
    <section class="category-management-post">
      <app-category-post
        :category="category"
        :disabled="disabled"
        @udpateValue="updateValue"
        @handleSubmit="handleSubmit"
      />
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
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
    loading() {
      return this.$store.state.categories.loading;
    },
    disabled() {
      const isValied = this.errors.items.length > 0;
      return this.loading || isValied;
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
    this.$store.dispatch('getAllCategories');
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('postCateogry', this.category);
      this.category = '';
      this.$store.dispatch('getAllCategories');
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('confirmDeleteCategory', { categoryId, categoryName });
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('deleteCategory', this.deleteCategoryId);
      this.toggleModal();
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
