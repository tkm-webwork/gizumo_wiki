<template lang="html">
  <div>
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
  </div>
</template>

<script>
import {
  Heading, Input, Textarea, MarkdownPreview, Button, Select, Text,
} from '@Components/atoms';

export default ({
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
    currentCategoryName: {
      type: String,
      default: '',
    },
    categoryList: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
