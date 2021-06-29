<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      :update-category-name="updateCategoryName"
      :err-message="errMessage"
      :done-message="doneMessage"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';
import { mapState } from 'vuex';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: mapState({
    access() {
      return this.$store.getters['auth/access'];
    },
    loading(state) {
      return state.categories.loading;
    },
    updateCategoryName(state) {
      return state.categories.updateCategoryName;
    },
    errMessage(state) {
      return state.categories.errorMessage;
    },
    doneMessage(state) {
      return state.categories.doneMessage;
    },
  }),
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategory', id);
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue($event) {
      this.$store.dispatch('categories/editCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/updateCategory');
    },
  },
};
</script>
