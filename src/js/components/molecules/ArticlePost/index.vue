<template>
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice">
      <app-text bg-danger>{{ errorMessage }}</app-text>
    </div>
    <div class="article-post__columns">
      <div class="article-post-editer">
        <app-heading
          :level="1"
        >
          記事の新規作成
        </app-heading>
        <app-heading
          class="article-post-title"
          :level="2"
        >
          カテゴリーの選択
        </app-heading>
        <div>
          <app-select
            v-validate="'required'"
            name="category"
            data-vv-as="カテゴリー"
            :value="currentCategoryName"
            :error-messages="errors.collect('category')"
            @updateValue="$emit('selectedArticleCategory',$event)"
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
              :selected="currentCategoryName === category.name ? true : false"
            >
              {{ category.name }}
            </option>
          </app-select>
        </div>
        <app-heading
          class="article-post-title"
          :level="2"
        >
          タイトル・本文
        </app-heading>
        <div class="article-post-form">
          <app-input
            v-validate="'required'"
            name="title"
            data-vv-as="記事のタイトル"
            placeholder="記事のタイトルを入力してください。"
            type="text"
            :value="articleTitle"
            :error-messages="errors.collect('title')"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>
        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            data-vv-as="記事の本文"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            :value="articleContent"
            :error-messages="errors.collect('content')"
            @updateValue="$emit('editedContent', $event)"
          />
        </div>
        <div class="article-post-submit">
          <app-button
            round
            :disabled="!disabled"
            @click="handleSubmit"
          >
            {{ buttonText }}
          </app-button>
        </div>
      </div>
      <div class="article-post-preview">
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </div>
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
    categoryList: {
      type: Array,
      default: () => [],
    },
    currentCategoryName: {
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
    markdownContent: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
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


<style lang="postcss" scpoed>
.article-post {
  &__columns {
    display: flex;
  }
  &-editer {
    width: 50%;
    padding-right: 30px;
    border-right: 1px solid #ccc;
  }
  &-title {
    margin-top: 16px;
  }
  &-form {
    margin-top: 20px;
  }
  &-submit {
    margin-top: 20px;
  }
  &-preview {
    width: 50%;
  }
  &__notice {
    margin-bottom: 18px;
  }
}
</style>
