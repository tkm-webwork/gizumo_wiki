<template>
  <div>
    <app-category-edit
      :update-category-name="updateCategoryName"
      :disabled="disabled"
      @udpateValue="updateValue"
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
    loading() {
      return this.$store.state.categories.loading;
    },
    disabled() {
      const isValied = this.errors.items.length > 0;
      return this.loading || isValied;
    },
    updateCategoryName() {
      return this.$store.state.categories.updateCategoryName;
    },
  },
  created() {
    const { id } = this.$route.params;
    this.$store.dispatch('getCategoryDetail', id);
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('editedCategoryName', $event.target.value);
    },
    handleSubmit() {
      if (this.disabled) return;
      this.$store.dispatch('updateCategory');
    },
  },
};
</script>
