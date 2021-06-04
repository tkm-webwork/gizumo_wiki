<template lang="html">
  <div class="article-post">
    <section class="article-post-editor">
      <app-heading :level="1">
        記事の新規作成
      </app-heading>
      <app-heading :level="2">
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
      <app-heading :level="2">
        タイトル・本文
      </app-heading>
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
  Heading,
  Input,
  Textarea,
  MarkdownPreview,
  // Button,
  Select,
  // Text,
} from '@Components/atoms';

export default ({
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appMarkdownPreview: MarkdownPreview,
    // appButton: Button,
    appSelect: Select,
    // appText: Text,
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
    access: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="postcss" scoped>
.article-post {
  display: flex;
  height: 100%;
  &-preview {
    /* width: 50%; */
  }
}
</style>
