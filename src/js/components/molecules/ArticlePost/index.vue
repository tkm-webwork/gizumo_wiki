<template lang="html">
  <div class="article-post">
    <div v-if="doneMessage" class="article-post__notice--update">
      <app-text bg-success>{{ doneMessage }}</app-text>
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
          name="category"
          data-vv-as="カテゴリー"
          :error-messages="errors.collect('category')"
          @updateValue="$emit('selectedArticleCategory', $event)"
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
            name="title"
            type="text"
            placeholder="記事のタイトルを入力してください。"
            white-bg
            data-vv-as="記事のタイトル"
            :error-messages="errors.collect('title')"
            :value="articleTitle"
            @updateValue="$emit('editedTitle', $event)"
          />
        </div>

        <div class="article-post-form">
          <app-textarea
            v-validate="'required'"
            name="content"
            placeholder="記事の本文をマークダウン記法で入力してください。"
            white-bg
            data-vv-as="記事の本文"
            :error-messages="errors.collect('content')"
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
        <app-markdown-preview
          :markdown-content="markdownContent"
        />
      </article>
    </div>
  </div>
</template>

