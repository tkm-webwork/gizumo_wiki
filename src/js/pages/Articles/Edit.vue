<template lang="html">
  <div class="article-edit">
    <section class="article-edit-editor">
      <app-heading :level="1">記事更新・追加</app-heading>
      <div class="article-edit-form">
        <app-input
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください。"
          required
          white-bg
          vvas="記事のタイトル"
          :value="title"
          @updateValue="updateValue"
        />
      </div>

      <div class="article-edit-form">
        <app-textarea
          name="content"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          required
          white-bg
          :value="content"
          @updateValue="updateValue"
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
  computed: {
    markdownContent() {
      return `# ${this.title}\n${this.content}`;
    },
  },
  methods: {
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
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
