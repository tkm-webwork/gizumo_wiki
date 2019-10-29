<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :update-category-name="updateCategoryName"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="updateCategory"
    />
    <!--追加したもの-->
    <!--:update-category-name="updateCategoryName"
      :error-messsage="errorMessage"
      :done-message="doneMessage"
      @updateValue="updateValue"
      @hundlesubmit="updateCategory"-->
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
    // 追加したもの---------------------------------------
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params; // apiに登録されているパラメータを取ってきている。
    // console.log(this.$route.params);
    this.$store.dispatch('categories/getCategoryDetail', id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    // 追加したもの。----------------------------------------
    updateValue($event) { // inputタグに入力された値をstoreのactionsに渡している。
      // this[$event.target.name] = $event.target.value;
      // console.log($event.target.value);
      // console.log($event.target.name);=updateCategoryName
      this.$store.dispatch('categories/editUpdateCategoryName', $event.target.value);
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
