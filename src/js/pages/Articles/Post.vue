<template lang="html">
  <div>
    <app-article-post
      :category-list="categoryList"
      :articleContent="articleContent"
      :articleText="articleText"
    />
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    ...mapGetters('categories', [
      'categoryList',
    ]),
    // ...mapState('articles', {
    //   articleTitle: 'targetArticle',
    //   articleText: 'targetArticle',
    // }),
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    ...mapActions('categories', [
      'getAllCategories',
    ]),
  },
};

</script>
