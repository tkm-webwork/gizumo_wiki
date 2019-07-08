<template lang="html">
  <div class="articles">
    <app-article-list
      :title="title"
      :target-array="articlesList"
      border-gray
      @openModal="openModal"
      @handleClick="handleClick"
    />
  </div>
</template>

<script>
import { ArticleList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleList: ArticleList,
  },
  mixins: [Mixins],
  data() {
    return {
      title: 'すべて',
    };
  },
  computed: {
    articlesList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    if (this.$route.query.category) {
      const { category } = this.$route.query;
      this.title = category;
      this.$store.dispatch('filteredArticles', category)
        .then(() => {
          if (this.$store.state.articles.articleList.length === 0) {
            this.$router.push({ path: '/notfound' });
          }
        }).catch(() => {
          // console.log(err);
        });
    } else {
      this.$store.dispatch('getAllArticles');
    }
  },
  methods: {
    openModal(articleId) {
      this.$store.dispatch('confirmDeleteArticle', articleId);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('deleteArticle');
      this.toggleModal();
      if (this.$route.query.category) {
        const { category } = this.$route.query;
        this.title = category;
        this.$store.dispatch('filteredArticles', category)
          .then(() => {
            if (this.$store.state.articles.articleList.length === 0) {
              this.$router.push({ path: '/notfound' });
            }
          }).catch(() => {
            // console.log(err);
          });
      } else {
        this.$store.dispatch('getAllArticles');
      }
    },
  },
};
</script>
