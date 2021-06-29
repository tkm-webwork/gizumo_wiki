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
  computed: {
    ...mapState('categories', [
      'loading',
      'updateCategoryName',
      'doneMessage',
    ]),
    ...mapState('categories', {
      errMessage: 'errorMessage',
    }),
    access() {
      return this.$store.getters['auth/access'];
    },
  },
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
