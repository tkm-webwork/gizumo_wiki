<template>
  <div class="article-post">
    <div v-if="errorMessage" class="article-post-error">
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
          :error-messages="errors.collect('category')"
          data-vv-as="カテゴリー"
          name="category"
          :value="categoryName"
          @updateValue="$emit('selectedArticleCategory', $event)"
        >
          <option value=""> --- </option>
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
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            v-validate="'required'"
            :error-messages="errors.collect('title')"
            data-vv-as="記事のタイトル"
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            :value="articleTitle"
            @updateValue="$emit('editeValue', $event)"
          />
        </div>
        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            :error-messages="errors.collect('content')"
            data-vv-as="記事の本文"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            :value="articleContent"
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
        <!-- <app-markdown-preview
          :markdown-content="markdownContent"
        /> -->
      </article>
    </div>
  </div>
</template>

<script>import {
  Text, Heading, Select, Input, Textarea, Button,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
    appSelect: Select,
    appInput: Input,
    appTextarea: Textarea,
    appButton: Button,
  },

  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleContent: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    categoryName: {
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
.article-post {
  &-error {
    margin-bottom: 16px;
  }
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

  &-submit {
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
