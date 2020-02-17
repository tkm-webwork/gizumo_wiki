<template lang="html">
  <div>
    <app-heading :level="1">記事の新規作成</app-heading>
    <form @submit.prevent="addArticle">
      <app-heading
        class="article-post__title"
        :level="2"
      >
        カテゴリーの選択
      </app-heading>
      <app-select
        class="article-post__select"
        :value="selectValue"
        v-validate="'required'"
        name="category"
        type="select"
        data-vv-as="カテゴリー"
        :error-messages="errors.collect('category')"
        @updateValue="$emit('updateSelectValue', $event)"
      >
        <option
          value=""
          selected
          disabled
        >
          ---
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.name"
        >
        {{ category.name }}
        </option>
      </app-select>
      <app-heading
        class="article-post__title"
        :level="2"
      >
        タイトル・本文
      </app-heading>
      <app-input
        class="article-post__input"
        placeholder="記事のタイトルを入力してください。"
        :value="inputValue"
        v-validate="'required'"
        name="title"
        type="text"
        data-vv-as="記事のタイトル"
        :error-messages="errors.collect('title')"
        @updateValue="$emit('updateInputValue', $event)"
      >
        componentsについて
      </app-input>
      <app-textarea
        class="article-post__textarea"
        placeholder="記事の本文をマークダウン記法で入力してください。"
        @updateValue="$emit('updateTextareaValue', $event)"
      />
      <app-button
        class="article-post__button"
        button-type="submit"
        round
        :disabled="disabled"
      >
        {{ buttonText }}
      </app-button>
    </form>
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, Button, Select,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appTextarea: Textarea,
    appButton: Button,
    appSelect: Select,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectValue: {
      type: String,
      default: '',
    },
    inputValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonText() {
      // if (!this.access.edit) return '変更権限がありません';
      return this.disabled ? '作成中...' : '作成';
    },
  },
  methods: {
    addArticle() {
      // if (!this.access.create) return;
      // this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$emit('handleSubmit');
        }
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
  &__select {
    margin-top: 16px;
  }
  &__input {
    margin-top: 16px;
  }
  &__textarea {
    margin-top: 16px;
  }
  &__button {
    margin-top: 16px;
  }
}
</style>
