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
        @handleSubmit="resisterCategory"
      /><!--hundlesubmitでresisterCategoryを追加-->
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @openModal="openModal"
        @handleClick="deleteCategory"
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
      // console.log($event.target.name);
      // console.log(this['category']);
      // console.log($event.target.value);
      this[$event.target.name] = $event.target.value; // ここでは、categoryPostでemitの際に渡している値。これは、valueなので、categoryである。
    }, // [$event.target.name]の[]は配列ではなく、変数として適宜使用するためにしようしている。$event.target.nameでもしようできるが、違うinputタグが出てきた場合にも汎用性高く使えるためこの表記でやっている。
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    openModal(categoryName, categoryId) {
      this.toggleModal();
      this.$store.dispatch('categories/clearMessage');
      this.$store.dispatch('categories/checkDelete', { categoryName, categoryId });
    },
    resisterCategory() {
      // console.log('handleSubmit');
      this.$store.dispatch('categories/resisterCategory', {
        category: this.category, // 渡す要素を指定している。カテゴリーには、入力したデータが入っている。
      }).then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
      this.category = '';
    },
    deleteCategory() {
      this.$store.dispatch('categories/deleteCategory', this.deleteCategoryId)
        .then(() => {
          this.$store.dispatch('categories/getAllCategories');
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
