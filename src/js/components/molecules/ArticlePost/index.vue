<template lang="html">
  <div class="article-post">
    <div class="article-post__columns">
      <section class="article-post-editor">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          name="category"
          :value="value"
        >
          <option value=""> --- </option>
        </app-select>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            white-bg
            data-vv-as="記事のタイトル"
            :value="articleTitle"
          />
        </div>

        <div class="article-post-form">
          <app-textarea
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            white-bg
            :value="articleContent"
          />
        </div>
        <app-button
          class="article-post-submit"
          button-type="submit"
          round
        >
          作成
        </app-button>
      </section>
    </div>
  </div>
</template>

<script>
import {
  Heading, Text, Select, Input, Textarea, Button,
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
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 10px;
    }
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 10px;
  }
}
</style>
