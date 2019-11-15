<template lang="html">
  <div class="authorList">
    <app-article-author-list
      :edited-author-list="editedAuthorList"
      :title="title"
    />
  </div>
</template>

<script>
import { ArticleAuthorList } from '@Components/molecules';

export default {
  components: {
    appArticleAuthorList: ArticleAuthorList,
  },
  data() {
    return {
      title: '作者別記事',
    };
  },
  computed: {
    editedAuthorList() {
      return this.$store.getters['articles/editedAuthorList'];
    },
  },
};
</script>
