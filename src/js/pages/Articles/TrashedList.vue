<template lang="html">
  <div class="articles">
    <app-article-trashed-list
      :title="title"
      :target-array="articlesList"
      border-gray
    />
  </div>
</template>

<script>
import { ArticleTrashedList } from '@Components/molecules';

export default {
  components: {
    appArticleTrashedList: ArticleTrashedList,
  },
  data() {
    return {
      title: '削除済み',
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
      this.$store.dispatch('articles/getArticles', categoryName)
        .then(() => {
          if (this.$store.state.articles.articleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
        });
    },
  },
};
</script>
