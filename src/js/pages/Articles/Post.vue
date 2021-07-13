<template lang="html">
  <div>
    <app-article-post
      :access="access"
      :loading="loading"
      :value="categoryName"
      :category-list="categoryList"
      :article-title="articleTitle"
      :article-contet="articleContent"
      :error-message="errorMessage"
      @clearMessage="clearMessage"
      @selectedArticleCategory="selectedArticleCategory"
      @editTitle="editTitle"
      @handleSubmit="handleSubmit"
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
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    ...mapGetters('categories', [
      'categoryList',
    ]),
    ...mapGetters('articles', [
      'loading',
      'errorMessage',
      'doneMessage',
      'targetArticle',
      // articleTitle: 'targetArticle',
      // articleText: 'targetArticle',
    ]),
    categoryName() {
      console.log(this.targetArticle.category.name);
      return this.targetArticle.category.name;
    },
    articleTitle() {
      const { title } = this.targetArticle;
      return title;
    },
    articleContent() {
      const { content } = this.targetArticle;
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
    ...mapActions('articles', [
      'clearMessage',
      'postArticle',
      'editTitle',
      'editContet',
      'selectedArticleCategory',
    ]),
    editTitle($event) {
      this.editTitle($event.target.value);
    },
    editContent($event) {
      this.editContent($event.target.value);
    },
    selectedArticleCategory($event) {
      console.log($event.target.value);
      const categoryName = $event.target.value ? $event.target.value : '';
      this.selectedArticleCategory(categoryName);
    },
    handleSubmit() {
      console.log('handle!!!!!!!!');
      if (this.loading) return;
      this.postArticle()
        .then(() => {
          // this.$router.push({
          //   path: '/articles',
          // });
          console.log('完了！');
        });
    },
  },
};

</script>
