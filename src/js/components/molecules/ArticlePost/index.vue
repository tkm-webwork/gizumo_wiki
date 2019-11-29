<template>
  <div>
    <div v-if="errorMessage" class="category-management-edit__notice">
      <app-text
        class="article-post-errormessage"
        bg-error
      >
        {{ errorMessage }}
      </app-text>
    </div>
    <section class="article-post">
      <div class="article-post-leftcolumn">
        <app-heading :level="1">記事の新規作成</app-heading>
        <section class="article-post-wrapper">
          <app-heading :level="2">カテゴリーの選択</app-heading>
          <app-router-link />
          <app-select
            v-validate="'required'"
            name="category"
            data-vv-as="カテゴリー"
            :value="currentCategoryName"
            :error-messages="errors.collect('category')"
            @updateValue="$emit('selectedArticleCategory', $event)"
          >
            <option value="" selected disabled>
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
        </section>
        <section class="article-post-wrapper">
          <app-heading :level="2">タイトル・本文</app-heading>
          <app-input
            v-validate="'required'"
            class="article-post-title"
            name="title"
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @updateValue="$emit('editedTitle', $event)"
          />
          <app-text />
          <app-text-area
            v-validate="'required'"
            class="article-post-textarea"
            name="content"
            :value="articleContent"
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
            @updateValue="$emit('editedContent', $event)"
          />
        </section>
        <app-button
          class="article-post-submit"
          button-type="submit"
          :disabled="!disabled"
          @click="handleSubmit"
        >
          {{ buttonText }}
        </app-button>
      </div>
      <div class="article-post-rightcolumn">
        <app-markdown-preview
          class="article-post-markdown"
          :markdown-content="markdownContent"
        />
      </div>
    </section>
  </div>
</template>
<script>
import {
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  RouterLink,
  Select,
  MarkdownPreview,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appText: Text,
    appRouterLink: RouterLink,
    appSelect: Select,
    appTextArea: Textarea,
    appMarkdownPreview: MarkdownPreview,
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
    access: {
      type: Object,
      default: () => ({}),
    },
    currentCategoryName: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
    doneMessage: {
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
  },
  computed: {
    buttonText() {
      if (!this.access.edit) return '更新権限がありません';
      return this.loading ? '作成中...' : '作成';
    },
    disabled() {
      return this.access.edit && !this.loading;
    },
  },

  methods: {
    handleSubmit() {
      if (!this.access.edit) return;
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },

};
</script>

<style lang="postcss" scoped>
.article-post {
display: flex;
&-leftcolumn{
  width: 48%;
  padding-right: 2%;
  border-right: 1px solid #ccc;
}
&-rightcolumn{
  width: 48%;
  margin-left: 2%;
}
&-submit{
  border-radius: 5px;
}
&-errormessage{
  margin-bottom: 16px;
}
&-wrapper{
  margin-top: 16px;
}
&-title{
  margin-top: 16px;
}
&-textarea{
  margin-top: 16px;
}
&-submit{
  margin-top: 16px;
}
&-markdown{
  word-break:break-all;
}
}
</style>
