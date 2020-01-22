<template lang="html">
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
          v-validate="required"
          name="title"
          type="text"
          placeholder="記事のタイトルを入力してください"
          data-vv-as="記事のタイトル"
          :value="articleTitle"
          @updateValue="$emit('editedTitle', $event)"
        />
      </div>
      <div class="new-article-post-form">
        <app-textarea
          v-validate="'required'"
          name="content"
          placeholder="記事の本文をマークダウン記法で入力してください。"
          data-vv-as="記事の本文"
          :value="articleContent"
          @updateValue="$emit('editContent', $event)"
        />
      </div>
      <app-button
        class="article-post-submit"
        button-type="submit"
        :disabled="!disabled"
        @click="handleSubmit"
      >
        ボタン
      </app-button>
    </section>
  </div>
</template>

<script>
import {
  Button, Heading, Input, Select, Textarea,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appButton: Button,
    appSelect: Select,
  },
  methods:{
    handleSubmit(){
      if(!this.access.create) return;
      this.$validator.validate().then((valid) =>
      {
        if(valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>

<style lang="postcss" scoped>

</style>
