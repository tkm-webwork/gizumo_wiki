<template lang="html">
  <app-article-trashed
    :title="title"
    :target-array="articlesList"
    :theads="theads"
  />
</template>
<script>
import { ArticleTrashed } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['ドキュメントタイトル', 'ドキュメント内容', 'ドキュメント作成日時'],
      title: '削除済み記事',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    const categoryName = this.$route.query.category ? this.$route.query.category : null;
    this.fetchArticles(categoryName);
  },
  methods: {
    fetchArticles(categoryName) {
      this.$store.dispatch('articles/getTrashedArticles', categoryName);
    },
  },
};
</script>
