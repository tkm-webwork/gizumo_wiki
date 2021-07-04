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
        @handleSubmit="deleteSubmitCategory"
      />
    </section>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';
import { mapActions, mapGetters } from 'vuex';

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
    ...mapGetters('categories', [
      'loading',
      'errorMessage',
      'doneMessage',
      'categoryList',
      'deleteCategoryId',
      'deleteCategoryName',
    ]),
  },
  created() {
    this.clearMessage();
    this.getAllCategories();
  },
  methods: {
    ...mapActions('categories', [
      'clearMessage',
      'setPickCategory',
      'postCategory',
      'getAllCategories',
      'deleteCategory',
    ]),
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    openModal(categoryId, categoryName) {
      this.toggleModal();
      this.clearMessage();
      this.setPickCategory({ categoryId, categoryName });
    },
    handleSubmit() {
      if (this.loading) return;
      this.postCategory(this.category)
        .then(() => {
          this.getAllCategories();
        });
    },
    deleteSubmitCategory() {
      this.deleteCategory(this.deleteCategoryId)
        .then(() => {
          this.getAllCategories();
        });
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
