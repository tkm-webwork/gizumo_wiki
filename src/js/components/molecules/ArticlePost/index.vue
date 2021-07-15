<template lang="html">
  <div class="article-post">
    <section class="article-post-editor">
      <div v-if="errorMessage" class="article-post__notice">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>
      <app-heading :level="1" class="article-post__title">記事の新規作成</app-heading>
      <app-heading :level="2" class="article-post__title">カテゴリーの選択</app-heading>
      <app-select
        v-validate="'required'"
        name="category"
        data-vv-as="カテゴリー"
        :error-messages="errors.collect('category')"
        :value="value"
        @updateValue="$emit('selectedArticleCategory', $event)"
      >
        <option value="">---</option>
        <option
          v-for="(category, index) in categoryList"
          :key="index"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading :level="2" class="article-post__title">タイトル・本文</app-heading>
      <app-input
        name="title"
        type="text"
        v-validate="'required'"
        data-vv-as="記事のタイトル"
        placeholder="記事のタイトルを入力してください"
        required
        white-bg
        :error-messages="errors.collect('title')"
        :value="articleTitle"
        @updateValue="$emit('updateTitle', $event)"
      />
      <div class="article-post__textarea">
        <app-textarea
          name="content"
          type="text"
          v-validate="'required'"
          data-vv-as="記事の本文"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          required
          white-bg
          :error-messages="errors.collect('content')"
          :value="articleContent"
          @updateValue="$emit('updateContent', $event)"
        />
      </div>
      <app-button
        button-type="submit"
        round
        class="article-post__submit"
        @click="addArticle"
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
  Heading, Input, Select, Textarea, Button, MarkdownPreview, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
    appInput: Input,
    appButton: Button,
    appSelect: Select,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: String,
      default: '',
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: '',
    },
    markdownContent: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
  },
  methods: {
    addArticle() {
      if (!this.access.create) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-post {
  display: flex;
  &-editor {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
  }
  &__title {
    margin-top: 16px;
  }
  &__textarea {
    margin-top: 20px;
  }
  &__submit {
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
