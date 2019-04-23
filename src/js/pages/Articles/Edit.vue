<template lang="html">
  <div class="article-edit">
    <section class="article-edit-editor">
      <app-heading text="記事更新・追加" :level="1" />
      <div class="article-edit-form">
        <app-input-text
          class-name="article-edit-title"
          label="タイトル"
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください。"
          :required="true"
          :value="title"
          @updateValue="updateValue"
        />
      </div>

      <div class="article-edit-form">
        <app-textarea
          class-name="article-edit-content"
          label="本文"
          name="content"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          :required="true"
          :value="content"
          @updateValue="updateValue"
        />
      </div>
    </section>

    <section class="article-edit-preview">
      <app-markdown-view
        :markdown-content="markdownContent"
      />
    </section>
  </div>
</template>

<script>
import Heading from '@Components/atoms/Heading';
import InputText from '@Components/atoms/InputText';
import Textarea from '@Components/atoms/Textarea';
import MarkdownView from '@Components/molecules/MarkdownView';

export default {
  components: {
    appHeading: Heading,
    appInputText: InputText,
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

<style lang="scss" scoped>
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
