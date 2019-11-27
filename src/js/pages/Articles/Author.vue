<template lang="html">
  <app-article-author
    :title="title"
    :target-array="articlesUserList"
    :theads="theads"
    :actives="actives"
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
      actives: [],
    };
  },
  computed: {
    articlesUserList() {
      return this.$store.state.articles.articleUsersList;
    },
  },
  created() {
    this.$store.dispatch('articles/getArticleUsers');
  },
  methods: {
    handleClick(user) {
      if (this.actives.some(val => val === user.id)) {
        this.actives = this.actives.filter(val => val !== user.id);
      } else {
        this.actives.push(user.id);
      }
    },
  },
};
</script>
