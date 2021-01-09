<template lang="html">
  <div class="category-management">
    <section class="category-management-post">
      <app-category-post
        :target-category="targetCategory"
        :disabled="loading ? true : false"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        @udpateValue="updateValue"
        @clearMessage="clearMessage"
        @handleSubmit="handleSubmit"
      />
      <!-- :category="category" -->
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @openModal="openModal"
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
      // category: '',
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
    //  追加するカテゴリー名を直接storeから取るなら実験
    targetCategory() {
      return this.$store.state.categories.targetCategory;
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
      // this.category = $event.target.value;
      this.$store.dispatch('categories/targetCategory', $event.target.value);
    },
    // this[$event.target.name] = $event.target.value;
    // console.log($event);
    // ？？？
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(category) {
      this.$store.dispatch('categories/clearMessage');
      this.$store
        .dispatch('categories/confirmDeleteCategory', {categoryId: category.id, categoryName: category.name});
      console.log(category.name);
      this.toggleModal();

    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/addCategory').then(() => {
        // this.$router.push({
        //   path: '/categories',
        //   query: { redirect: '/category/post' },
        // });
        this.$store.dispatch('categories/getAllCategories');
        this.$store.state.categories.targetCategory = '';
      });
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
