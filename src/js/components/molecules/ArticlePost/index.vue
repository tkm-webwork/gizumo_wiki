<template>
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-heading :level="1">記事の新規作成</app-heading>
    <app-heading :level="2">カテゴリー選択</app-heading>
    <app-select
      v-validate="'required'"
      name="category"
      data-vv-as="カテゴリー"
      :error-messages="errors.collect('category')"
      :value="currentCategoryName"
      @updateValue="$emit('selectedArticleCategory', $event)"
    >
      <option value="" selected disabled>---</option>
      <option
        v-for="category in targetArray"
        :key="category.id"
        :value="category.name"
      >
        {{ category.name }}
      </option>
    </app-select>
    <app-heading :level="2">タイトル・本文</app-heading>
    <app-input
      v-validate="'required'"
      name="title"
      type="text"
      placeholder="タイトルを入力してください"
      data-vv-as="タイトル"
      :error-messages="errors.collect('title')"
      :value="articleTitle"
      @updateValue="$emit('editedTitle', $event)"
    />
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
    <app-button
      button-type="submit"
      round
      :disabled="!disabledToggle"
      @click="handleSubmit"
    >
      {{ buttonText }}
    </app-button>
    <app-markdown-preview white-bg />
  </div>
</template>

<script>
import {
  Heading,
  Input,
  Button,
  Text,
  Select,
  Textarea,
  MarkdownPreview,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
    appSelect: Select,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    targetArray: {
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
    currentCategoryName: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
    disabledToggle() {
      return this.access.create && !this.loading;
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.access.create) return;
      const valid = await this.$validator.validate();
      if (valid) this.$emit('handleSubmit');
    },
  },
};
</script>

<style></style>
