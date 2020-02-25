<template lang="html">
  <div>
    <app-article-post
      :category-name="categoryName"
      :category-list="categoryList"
      :article-title="articleTitle"
      :article-content="articleContent"
      :error-message="errorMessage"
      :markdown-content="markdownContent"
      :access="access"
      :loading="loading"
      @selectAticleCategory="selectAticleCategory"
      @editedTitle="editedTitle"
      @editedContent="editedContent"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    categoryName() {
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    categoryList() {
      const { categoryList } = this.$store.state.categories;
      return categoryList;
    },
    articleTitle() {
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    markdownContent() {
      // return marked(this.articleTitle);
      const title = this.articleTitle;
      const content = this.articleContent;
      return `# ${title}\n${content}`;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    access() {
      // authのgetters内にあるaccessを実行しオブジェクトが返ってくる
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
  },
  methods: {
    selectAticleCategory($event) {
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
    editedTitle($event) {
      const title = $event.target.value;
      this.$store.dispatch('articles/editedTitle', title);
    },
    editedContent($event) {
      const content = $event.target.value;
      this.$store.dispatch('articles/editedContent', content);
    },
    convertMarkdown() {
      console.log('test');
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => {
        this.$router.push({
          path: '/articles',
          query: { redirect: '/articles/post' },
        });
      });
    },
  },
};

</script>
