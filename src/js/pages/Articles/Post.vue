<template lang="html">
  <app-article-post
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
  />
</template>

<script>
import { CategoryPost } from '@Components/molecules'

export default ({
  components: {
    appCategoryPost: CategoryPost,
  },
});
