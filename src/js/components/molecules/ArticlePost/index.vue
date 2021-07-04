<template lang="html">
  <div class="article-post">
    <form class="article-post__form">
      <app-heading :level="1">記事の新規作成</app-heading>
      <app-heading :level="2" class="article-post__title">カテゴリーの選択</app-heading>
      <app-select>
        <option value="">---</option>
        <option
          v-for="(category, index) in categoryList"
          :key="index"
        >
          {{ category.name }}
        </option>
      </app-select>
      <app-heading :level="2" class="article-post__title">タイトル・本文</app-heading>
      <app-input
        v-validate="'required'"
        name="category"
        type="text"
        placeholder="記事のタイトルを入力してください"
        :value="articleTitle"
      />
      <div class="article-post__textarea">
        <app-textarea
         placeholder="記事の本文をマークダウン記法で入力してください。"
         :value="articleText"
        />
      </div>
      <app-button
        round
        class="article-post__submit"
      >
        作成
      </app-button>
    </form>
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
    // appText: Text,
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
    articleTitle: {
      type: String,
      default: '',
    },
    articleText: {
      type: String,
      default: '',
    },
  },
  // computed: {
  // },
  // methods: {
  // },
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
