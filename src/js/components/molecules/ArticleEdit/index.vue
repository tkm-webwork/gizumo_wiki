<template lang="html">
  <div class="article-edit">
    <section class="article-edit-editor">
      <app-heading :level="1">記事の更新</app-heading>
      <app-heading
        class="article-edit-editor-title"
        :level="2"
      >
        カテゴリーの選択
      </app-heading>
      <app-select
        :value="currentCategoryName"
        @updateValue="$emit('selectedArticleCategory', $event)"
      >
        <option
          v-for="(category) in categoryList"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading
        class="article-edit-editor-title"
        :level="2"
      >
        タイトル・本文の更新
      </app-heading>
      <div class="article-edit-form">
        <app-input
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください。"
          required
          white-bg
          vvas="記事のタイトル"
          :value="articleTitle"
          @updateValue="$emit('editedTitle', $event)"
        />
      </div>

      <div class="article-edit-form">
        <app-textarea
          name="content"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          required
          white-bg
          :value="articleContent"
          @updateValue="$emit('editedContent', $event)"
        />
      </div>
      <app-button
        class="article-edit-submit"
        button-type="submit"
        round
        @click="$emit('handleSubmit')"
      >
        更新
      </app-button>
    </section>

    <article class="article-edit-preview">
      <app-markdown-preview
        :markdown-content="markdownContent"
      />
    </article>
  </div>
</template>

<script>
import {
  Heading, MarkdownPreview, Textarea, Input, Button, Select,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appInput: Input,
    appButton: Button,
    appSelect: Select,
  },
  props: {
    articleId: {
      type: Number,
      default: 0,
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    markdownContent: {
      type: String,
      default: '',
    },
    currentCategoryName: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-edit {
  display: flex;
  height: 100%;
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
    }
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
  &-submit {
    margin-top: 16px;
  }
}
</style>
