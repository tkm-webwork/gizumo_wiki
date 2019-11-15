<template lang="html">
  <div class="authorList">
    <app-article-author-list
      :target-array="articlesList"
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
    articlesList() {
      return this.$store.state.articles.articleList;
    },
    editedAuthorList() {
      return this.$store.getters['articles/editedAuthorList'];
    },
  },
  created() { // ページ更新時も初期表示をさせたい
    this.$store.dispatch('articles/getArticles');
  },
};
</script>
