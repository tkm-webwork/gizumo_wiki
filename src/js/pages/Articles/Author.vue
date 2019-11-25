<template lang="html">
  <app-article-author
    :title="title"
    :target-array="articlesUserList"
    :theads="theads"
    :active="active"
    @handleClick="handleClick"
  />
</template>
<script>
import { ArticleAuthor } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appArticleAuthor: ArticleAuthor,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['ドキュメント作成者'],
      title: 'ドキュメント作成者',
      active: '',
    };
  },
  computed: {
    articlesUserList() {
      return this.$store.state.articles.articleUsersList;
    },
  },
  created() {
    const categoryName = this.$route.query.category ? this.$route.query.category : null;
    this.fetchArticles(categoryName);
  },
  methods: {
    fetchArticles(categoryName) {
      this.$store.dispatch('articles/getArticleUsers', categoryName);
    },
    handleClick(users) {
      this.active = this.active === users ? '' : users;
    },
  },
};
</script>
