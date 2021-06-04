<template lang="html">
  <app-articles-post
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
  />
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default ({
  components: {
    appArticlesPost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    markdownContent() {
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    currentCategoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
  },
});
</script>
