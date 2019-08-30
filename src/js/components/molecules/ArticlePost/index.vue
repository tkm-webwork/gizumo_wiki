<template lang="html">
  <div class="article-post">
    <div v-if="errorMessage" class="article-post-error">
      <app-text
        bg-error
      >
        {{ errorMessage }}
      </app-text>
    </div>
    <div class="article-post-columns">
      <section class="article-post-editor">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="article-post-editor-category"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          class="article-post-editor-selection"
          name="category"
          data-vv-as="カテゴリー"
          :error-messages="errors.collect('category')"
          :value="categoryName"
          @updateValue="$emit('selectedArticleCategory', $event)"
        >
          <option value="" disabled selected> --- </option>
          <option
            v-for="(category) in categoryList"
            :key="category.id"
            :value="category.name"
            :selected="category.name === categoryName"
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          class="article-post-editor-content"
          :level="2"
        >
          タイトル・本文
        </app-heading>

        <app-input
          v-validate="'required'"
          class="article-post-editor-title"
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください。"
          data-vv-as="記事のタイトル"
          :value="articleTitle"
          :error-messages="errors.collect('title')"
          @updateValue="$emit('newTitle', $event)"
        />
        <app-textarea
          v-validate="'required'"
          class="article-post-editor-text"
          name="textarea"
          type="textarea"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          data-vv-as="記事の本文"
          :value="articleContent"
          :error-messages="errors.collect('textarea')"
          @updateValue="$emit('newContent', $event)"
        />
        <app-button
          class="article-post-editor-button"
          button-type="submit"
          round
          :disabled="disabled"
          @click="handleSubmit"
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
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, MarkdownPreview, Button, Select, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appButton: Button,
    appSelect: Select,
    appText: Text,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    categoryName: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
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
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません。';
      return this.loading ? '作成中...' : '作成';
    },
    disabled() {
      return this.loading;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.create) return;
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-post {

  &-error {
    margin-bottom: 10px;
  }
  &-columns {
    display: flex;
  }
  &-editor {
    width: 50%;

    &-category {
      margin-top: 20px;
    }
    &-selection {
      margin-top: 20px;
    }
    &-content {
      margin-top: 20px;
    }
    &-title {
      margin-top: 20px;
    }
    &-text {
      margin-top: 20px;
    }
    &-button {
      border-radius: 5px;
      margin-top: 20px;
    }
  }
  &-preview {
    border-left: 1px solid #ccc;
    margin-left: 2%;
    width: 48%;
  }
}
</style>
