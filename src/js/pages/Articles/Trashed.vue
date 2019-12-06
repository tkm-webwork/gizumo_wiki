<template lang="html">
  <div class="articles">
    <app-article-trashed
      :title="title"
      :target-array="articleTrashed"
      :access="access"
      border-gray
    />
  </div>
</template>

<script>
import { ArticleTrashed } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleTrashed: ArticleTrashed,
  },
  mixins: [Mixins],
  beforeRouteUpdate(to, from, next) {
    const categoryName = to.query.category ? to.query.category : null;
    this.fetchArticles(categoryName);
    next();
  },
  data() {
    return {
      title: '削除済みの記事',
    };
  },
  computed: {
    articleTrashed() {
      return this.$store.state.articles.articleTrashed;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    const categoryName = this.$route.query.category ? this.$route.query.category : null;
    this.fetchArticles(categoryName);
  },
  methods: {
    fetchArticles(categoryName) {
      this.$store.dispatch('articles/getTrashedArticles', categoryName)
        .then(() => {
          if (this.$store.state.articles.articleTrashed.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
        });
    },
  },
};
</script>
