<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :disabled="loading ? true : false"
      :access="access"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
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
    this.$store.dispatch('categories/getCategoryName', this.$route.params.id); // 動的セグメントの値は全てのコンポーネント内で this.$route.params として利用可能
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
      this.$store.dispatch('categories/editCategoryName', this[$event.target.name]);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
