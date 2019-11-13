<template lang="html">
  <div class="article-post">
    <div v-if="doneMessage" class="article-post__notice--success">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div v-if="errorMessage" class="article-post__notice--error">
      <app-text bg-error>{{ errorMessage }}</app-text>
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
        <app-select
          v-validate="'required'"
          name="category"
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
            v-for="(category) in categoryList"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </option>
        </app-select>
        <app-heading
          :level="2"
          class="article-post-editor-title"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>
        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            name="text"
            type="text"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            data-vv-as="記事の本文"
            :error-messages="errors.collect('text')"
            :value="articleContent"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  Heading, MarkdownPreview, Textarea, Input, Button, Select, Text,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
    appSelect: Select,
    appInput: Input,
    appTextarea: Textarea,
  },
  props: {
    doneMessage: {
      type: String,
      default: '',
    },
    errorMessage: {
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
  &-form {
      margin-top: 20px;
    }
}
</style>
