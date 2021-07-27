<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :update-category-name="updateCategoryName"
      @clearMessage="clearMessage"
      @handleSubmit="updateNewCategory"
      @updateNewValue="updateNewValue"
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
      'updateCategory',
    ]),
    updateNewValue($event) {
      this.updateValue($event.target.value);
    },
    updateNewCategory() {
      if (this.loading) return;
      this.updateCategory();
    },
  },
};
</script>
