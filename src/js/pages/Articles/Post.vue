<template lang="html">
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :category-list="categoryList"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editContent="editContent"
    @handleSubmit="handleSubmit"
  >  
  </app-article-post>
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  computed: {
    articleTitle(){
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent(){
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    categoryList(){
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
  },
  created(){

  },
  methods: {

  }
}

</script>