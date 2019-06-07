<template lang="html">
  <div class="article-edit">
    <section class="article-edit-editor">
      <app-heading :level="1">記事の更新</app-heading>
      <div class="article-edit-form">
        <app-input
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください。"
          required
          white-bg
          vvas="記事のタイトル"
          :value="articleTitle"
          @updateValue="editedTitle"
        />
      </div>

      <div class="article-edit-form">
        <app-textarea
          name="content"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          required
          white-bg
          :value="articleContent"
          @updateValue="editedContent"
        />
      </div>
    </section>

    <article class="article-edit-preview">
      <app-markdown-view
        :markdown-content="markdownContent"
      />
    </article>
  </div>
</template>

<script>
import { Heading, Input, Textarea } from '@Components/atoms';
import { MarkdownView } from '@Components/molecules';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownView: MarkdownView,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  beforeRouteEnter(route, redirect, next) {
    next(vm => vm.getArticle(route.params.id));
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
  },
  methods: {
    getArticle(id) {
      this.$store.dispatch('getArticle', parseInt(id, 10));
      // if (this.$store.state.articles.targetArticle.id === null) {
      //   this.$router.push({ path: '/notfound' });
      // }
      this.$nextTick().then(() => {
        if (!this.$store.state.articles.targetArticle.id) {
          this.$router.push({ path: '/notfound' });
        }
      });
    },
    editedTitle($event) {
      this.$store.dispatch('editedTitle', $event.target.value);
    },
    editedContent($event) {
      this.$store.dispatch('editedContent', $event.target.value);
    },
  },
};
</script>

<style lang="css" scoped>
.article-edit {
  display: flex;
  height: 100%;
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
  }
  &-preview {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
  }
  &-form {
    margin-top: 20px;
  }
}
</style>
