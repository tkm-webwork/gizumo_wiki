<template lang="html">
  <div>
    <app-article-post
      :category-list="categoryList"
    />
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';
import { mapGetters } from 'vuex';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    ...mapGetters('articles', [
      'categoryList',
    ]),
  },
};

</script>
