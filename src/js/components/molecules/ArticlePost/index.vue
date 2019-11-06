<template lang="html">
  <div class="article-create">
    <div v-if="doneMessage" class="article-edit__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div v-if="errorMessage" class="article-edit__notice--update">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <div class="article-create__columns">
      <section class="article-create-editor">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="article-create-editor-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          name="category"
          data-vv-as="カテゴリー"
          :value="currentCategoryName"
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
            v-for="(category) in categoryList"
            :key="category.id"
            :value="category.name"
            :selected="currentCategoryName === category.name ? true : false "
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          class="article-create-editor-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-create-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            white-bg
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>

        <div class="article-create-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            white-bg
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
            :value="articleContent"
            @updateValue="$emit('editedContent', $event)"
          />
        </div>
        <app-button
          class="article-create-submit"
          button-type="submit"
          round
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </section>
      <article class="article-create-preview">
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
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    appInput: Input,
    appButton: Button,
    appSelect: Select,
    appText: Text,
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
    loading: {
      type: Boolean,
      default: false,
    },
    doneMessage: {
      type: String,
      default: '',
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
    buttonText() {
      if (!this.access.edit) return '作成権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
    disabled() {
      return this.access.edit && !this.loading;
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
.article-create {
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
  &__notice--update {
    margin-bottom: 16px;
  }
}
</style>
