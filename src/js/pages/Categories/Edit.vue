<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :disabled="loading ? true : false"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @clearMessage="clearMessage"
      @updateValue="updateValue"
      @handleSubmit="updateCategory"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  // data() {
  //   return {
  //     updateCategoryName: 'aaa'
  //   };
  // },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('categories/getCategoryDetail', { id });
      // .then(() => {
      //   this.updateCategoryName = 'aaa';
      // });
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this[$event.target.value] = $event.target.value;
      this.$store.dispatch('categories/editedCategoryName', this[$event.target.value])
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateCategory() {
      if(this.loading) return;
      this.$store.dispatch('categories/updateCategory', this.updateCategoryName);
    },
  },
};
</script>
