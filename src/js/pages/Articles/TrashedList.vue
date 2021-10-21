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
      return this.$store.getters['articles/sortDateTrashedArticles'];
    },
  },
  async created() {
    await this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      this.$store.dispatch('articles/getTrashedArticles')
        .then(() => {
          if (this.$store.state.articles.trashedArticleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
        });
    },
  },
};
</script>
