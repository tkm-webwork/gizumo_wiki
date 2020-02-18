<template lang="html">
  <div>
    <app-text
      class="article-text"
      v-if="errorMessage"
      error
      bgError
    >
      {{ errorMessage }}
    </app-text>
    <div class="is-flex">
      <app-article-post
        class="article-post"
        :categories="categoryList"
        :disabled="loading ? true : false"
        :selectValue="selectValue"
        :inputValue="inputValue"
        @updateSelectValue="updateSelectValue"
        @updateInputValue="updateInputValue"
        @updateTextareaValue="updateTextareaValue"
        @handleSubmit="postArticle"
      />
      <app-markdown-preview
        class="markdown-preview"
        :markdownContent="fetchContent"
      />
    </div>
  </div>
</template>

<script>
import { ArticlePost } from '@Components/molecules';
import { MarkdownPreview, Text } from '@Components/atoms';

export default {
  components: {
    appArticlePost: ArticlePost,
    appMarkdownPreview: MarkdownPreview,
    appText: Text,
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    selectValue() {
      return this.$store.state.articles.targetArticle.category.name;
    },
    inputValue() {
      return this.$store.state.articles.targetArticle.title;
    },
    fetchContent() {
      return this.$store.state.articles.targetArticle.content;
    },
  },
  methods: {
    updateSelectValue($event) {
      // this.$store.dispatch('articles/updateSelectValue', $event.target.value);
      this.$store.dispatch('articles/selectedArticleCategory', $event.target.value);
    },
    updateInputValue($event) {
      this.$store.dispatch('articles/updateInputValue', $event.target.value);
    },
    updateTextareaValue($event) {
      this.$store.dispatch('articles/updateTextareaValue', $event.target.value);
    },
    postArticle() {
      this.$store.dispatch('articles/postArticle')
        .then(() => {
          this.$router.push({
            path: '/articles',
            query: { redirect: this.$route.fullPath },
          });
        });
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('articles/initPostArticle');
  },
};
</script>

<style lang="postcss" scoped>
/* .category-management {
  display: flex;
  height: calc(100vh - 94px);
  &-post {
    padding-right: 2%;
    width: 38%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
  }
} */
  .is-flex {
    display: flex;
  }

  .article {
    &-post {
      width: 48%;
      padding-right: 2%;
      border-right: 1px solid #ccc;
    }
  }

  .markdown-preview {
    width: 50%;
    padding-left: 2%;
  }
</style>
