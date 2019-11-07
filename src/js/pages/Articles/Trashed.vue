<template lang="html">
  <div class="trashedArticles">
    <app-article-trashed
      :target-array="trashedArticleList"
      :title="title"
    />
  </div>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  data() {
    return {
      title: '削除済み記事',
    };
  },
  computed: {
    trashedArticleList() {
      return this.$store.state.articles.trashedArticleList;
    },
  },
  created() { // 削除記事一覧のstateを更新。computedで反映
    this.$store.dispatch('articles/getTrashedArticles');
  },
};
</script>
