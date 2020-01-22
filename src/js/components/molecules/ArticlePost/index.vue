<template lang="html">
  <div class="new-article">
  </div>
  <div class="new-article__contents">
    <section class="new-article-post">
      <app-heading :level="1">記事の新規作成</app-heading>
      <app-heading
        class="new-article-post-title"
        :level="2">カテゴリーの選択</app-heading>
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
    </template>

    <script>
    import {
      Button, Heading, Input, Select, Textarea, 
    } from '@Components/atoms';
    </script>