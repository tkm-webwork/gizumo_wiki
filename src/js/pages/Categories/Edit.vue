<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :access="access"
      @clearMessage="clearMessage"
    />
    <p>{{ $store.state.updateCategoryId }}</p>
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  data() {
    return {
      name: '',
    };
  },
  components: {
    appCategoryEdit: CategoryEdit,
  },
  computed: {
    categoryId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    showCategory() {
      return this.$store.state.updateCategoryId;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategoryDetail', parseInt(this.categoryId, 10));
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>
