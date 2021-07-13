<template lang="html">
  <div class="article-post">
    <div v-if="errorMessage" class="article-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <!-- <form class="article-post__form" @submit.prevent="addArticle"> -->
    <section class="article-post-editor">
      <app-heading :level="1">記事の新規作成</app-heading>
      <app-heading :level="2" class="article-post__title">カテゴリーの選択</app-heading>
      <app-select
        v-validate="'required'"
        name="category"
        data-vv-as="カテゴリー"
        :error-messages="errors.collect('category')"
        :value="value"
        @selectedArticleCategory="$emit('selectedArticleCategory', $event)"
      >
        <option value="">---</option>
        <option
          v-for="(category, index) in categoryList"
          :key="index"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading :level="2" class="article-post__title">タイトル・本文</app-heading>
      <app-input
        v-validate="'required'"
        name="title"
        type="text"
        placeholder="記事のタイトルを入力してください"
        :value="articleTitle"
        @editTitle="$emit('editTitle', $event)"
      />
      <div class="article-post__textarea">
        <app-textarea
          placeholder="記事の本文をマークダウン記法で入力してください。"
          name="content"
          :value="articleContent"
          @editContent="$emit('editContent', $event)"
        />
      </div>
      <app-button
        button-type="submit"
        round
        class="article-post__submit"
        @click="addArticle"
      >
        {{ buttonText }}
      </app-button>
    </section>
    <!-- </form> -->
  </div>
</template>

<script>
import {
  Heading, Input, Select, Textarea, Button,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appSelect: Select,
    appTextarea: Textarea,
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
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
    access: {
      type: Object,
      default: () => ({}),
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません';
      return this.disabled ? '作成中...' : '作成';
    },
  },
  methods: {
    addArticle() {
      if (!this.access.create) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        console.log((valid));
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-post {
  &__title {
    margin-top: 16px;
  }
  &__textarea {
    margin-top: 20px;
  }
  &__submit {
    margin-top: 16px;
  }
}
</style>
