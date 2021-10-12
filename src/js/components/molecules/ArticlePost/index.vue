<template>
  <div class="article-post">
    <div class="article-post-error">
      <app-text bg-error>エラーメッセージ</app-text>
    </div>
    <div class="article-post__columns">
      <section class="article-post-editor">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select>
          <option value=""> --- </option>
        </app-select>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input />
        </div>
        <div class="article-post-form">
          <app-textarea />
        </div>
        <app-button class="article-post-submit">
          ボタン
        </app-button>
      </section>

      <article class="article-post-preview">
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </article>
    </div>
  </div>
</template>

<script>import {
  Text, Heading, Select, Input, Textarea, Button,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
    appSelect: Select,
    appInput: Input,
    appTextarea: Textarea,
    appButton: Button,
  },
};
</script>

<style lang="postcss" scoped>
.article-post {
  &-error {
    margin-bottom: 16px;
  }
  &__columns {
    display: flex;
    height: 100%;
  }

  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
    }
  }

  &-form {
    margin-top: 20px;
  }

  &-submit {
    margin-top: 16px;
  }

  &-preview {
    margin-left: 2%;
    width: 48%;
    overflow-y: scroll;
    background-color: #fff;
  }
}
</style>
