<template>
  <div>
    <app-category-edit
      :disabled="loadings ? true : false"
      :access="access"
      :error-messages="errorMessages"
      :done-messages="doneMessages"
      :update-category-names="updateCategoryNames"
      @clearMessages="clearMessages"
      @handleSubmit="updateCategorys"
      @updateValues="updateValues"
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
      'loading',
      'errorMessage',
      'doneMessage',
      'updateCategoryName',
    ]),
    access() {
      return this.$store.getters['auth/access'];
    },
    loadings() {
      return this.loading;
    },
    errorMessages() {
      return this.errorMessage;
    },
    doneMessages() {
      return this.doneMessage;
    },
    updateCategoryNames() {
      return this.updateCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.getCategory(id);
    this.clearMessage();
  },
  methods: {
    ...mapActions('categories', [
      'getCategory',
      'clearMessage',
      'updateValue',
      'updateCategory'
    ]),
    clearMessages() {
      this.clearMessage();
    },
    updateValues($event) {
      this.updateValue($event.target.value);
    },
    updateCategorys() {
      if (this.loadings) return;
      this.updateCategory();
    },
  },
};
</script>
