<template>
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-heading :level="1">記事の新規作成</app-heading>
    <app-heading :level="2">カテゴリー選択</app-heading>
    <app-select name="category">
      <option value="---" disabled>---</option>
      <option
        v-for="category in targetArray"
        :key="category.id"
        :value="category"
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
    />
    <app-textarea />
    <app-button small round>作成</app-button>
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
  },
};
</script>

<style></style>
