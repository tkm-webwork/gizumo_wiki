<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :update-category-names="updateCategoryNames"
      @clearMessage="clearMessage"
      @handleSubmit="updateCategory"
      @updateValue="updateValue"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  // createdでVueインスタンスが読み込まれた時にしたい記述を書く。
  // mountedだとエレメントが出来てからになり、画面が書き出された後になるため
  computed: {
    ...mapGetters('categories', [
      'updateCategoryName',
    ]),
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
    updateCategoryNames() {
      return this.updateCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getCategory(id);
    this.$store.dispatch('caterories/clearMessage');
  },
  methods: {
    ...mapActions('categories', [
      'getCategory',
    ]),
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
    updateCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
