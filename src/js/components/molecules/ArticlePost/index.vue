<template lang="html">
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice--error">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div class="article-post__columns">
      <section class="article-post-editor">
        <app-heading
          class="article-post-editor-title"
          :level="1"
        >
          記事の新規作成
        </app-heading>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          name="category"
          :value="articleCategoryName"
          data-vv-as="カテゴリー"
          :error-messages="errors.collect('category')"
          @updateValue="$emit('selectedArticleCategory', $event)"
        >
          <option
            value=""
            selected
            disabled
          >
            ---
          </option>
          <option
            v-for="category in categoryList"
            :key="category.id"
            :value="category.name"
            :selected="articleCategoryName === category.name ? true : false"
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          class="article-post-editor-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            v-validate="'required'"
            :value="targetArticleTitle"
            type="text"
            name="title"
            placeholder="記事のタイトルを入力してください。"
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>
        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            :value="targetArticleContent"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
            @updateValue="$emit('editedContent', $event)"
          />
        </div>

        <app-button
          class="article-post-submit"
          button-type="submit"
          round
          :disabled="!disabled"
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
    targetArticleTitle: {
      type: String,
      default: '',
    },
    targetArticleContent: {
      type: String,
      default: '',
    },
    articleCategoryName: {
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
    loading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    disabled() {
      return this.access.edit && !this.loading;
    },
    buttonText() {
      if (!this.access.edit) return '作成権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
  },
  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-post {
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
  &__notice--error {
    margin-bottom: 16px;
  }
}
</style>
