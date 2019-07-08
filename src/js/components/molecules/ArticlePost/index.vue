<template lang="html">
  <div class="article-post">
    <section class="article-post-editor">
      <app-heading :level="1">記事の新規作成</app-heading>
      <app-heading
        class="article-post-editor-title"
        :level="2"
      >
        カテゴリーの選択
      </app-heading>
      <app-select
        :value="value"
        @updateValue="$emit('selectedArticleCategory', $event)"
      >
        <option
          value=""
        />
        <option
          v-for="(category) in categoryList"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading
        class="article-post-editor-title"
        :level="2"
      >
        カテゴリーの選択
      </app-heading>
      <div class="article-post-form">
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

      <div class="article-post-form">
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
        class="article-post-submit"
        button-type="submit"
        round
        @click="$emit('handleSubmit')"
        :disabled="loading"
      >
        {{ buttonText }}
      </app-button>
    </section>

    <article class="article-post-preview">
      <app-markdown-preview
        :markdown-content="markdownContent"
      />
    </article>
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, MarkdownPreview, Button, Select,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appButton: Button,
    appSelect: Select,
  },
  props: {
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
    categoryList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      return this.loading ? '作成中...' : '作成';
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-post {
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
