<template lang="html">
  <div class="category-management">
    <section class="category-management-post">
      <app-category-post
        :category="category"
        :loading="loading"
        @udpateValue="updateValue"
        @handleSubmit="handleSubmit"
      />
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
      />
    </section>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      category: '',
      theads: ['カテゴリー名', 'カテゴリーの削除'],
    };
  },
  computed: {
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
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
  },
};
</script>

<style lang="postcss" scoped>
.category-management {
  display: flex;
  height: calc(100vh - 94px);
  &-post {
    padding-right: 2%;
    width: 30%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 68%;
  }
}
</style>
