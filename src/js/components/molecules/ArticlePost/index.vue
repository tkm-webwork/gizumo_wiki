<template lang="html">
  <div class="new-article">
    <div v-if="errorMessage" class="new-article__message">
      <app-text bg-error>{{ errorMessage }} </app-text>
    </div>
    <div class="new-article__contents">
      <section class="new-article-post">
        <app-heading :level="1">記事の新規作成</app-heading>
        <app-heading
          class="new-article-post-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <app-select
          v-validate="'required'"
          name="category"
          data-vv-as="カテゴリー"
          :error-messages="errors.collect('category')"
          :value="categoryName"
          @updateValue="$emit('selectedArticleCategory', $event)"
        >
          <option
            value=""
            disabled
            selected
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
          class="new-article-post-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="new-article-post-form">
          <app-input
            v-validate="'required'"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください"
            data-vv-as="記事のタイトル"
            white-bg
            :value="articleTitle"
            :error-messages="errors.collect('title')"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>
        <div class="new-article-post-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            :error-messages="errors.collect('content')"
            data-vv-as="記事の本文"
            :value="articleContent"
            @updateValue="$emit('editedContent', $event)"
          />
        </div>
        <app-button
          class="new-article-post-submit"
          button-type="submit"
          round
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </section>

      <article class="new-article-post-preview">
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </article>
    </div>
  </div>
</template>

<script>
import {
  Button, Heading, Input, Select, Textarea, MarkdownPreview,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appButton: Button,
    appSelect: Select,
    appMarkdownPreview: MarkdownPreview,
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
    categoryList: {
      type: Array,
      default: () => [],
    },
    categoryName: {
      type: String,
      default: '',
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
    disabled() {
      return this.access.create && !this.loading;
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
.new-article {
  &-post {
    padding-right: 2%;
    width: 50%;
    border-right: 1px solid #ccc;
    &-title {
      margin-top: 16px;
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
      margin-top: 20px;
    }
  }
  &__contents {
    display: flex;
    height: 100%;
  }
  &__message {
    margin-bottom: 16px;
  }
}
</style>
