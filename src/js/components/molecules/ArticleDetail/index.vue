<template lang="html">
  <div>
    <section class="article-detail">
      <app-heading :level="1">記事詳細（プレビュー）</app-heading>
      <div class="article-detail-links">
        <app-router-link
          :to="`/articles/${articleId}/edit`"
          white
          bg-lightgreen
          large
        >
          更新
        </app-router-link>
        <app-button
          bg-danger
          :disabled="!access.delete"
          :access="access"
          @click="openModal"
        >
          {{ buttonText }}
        </app-button>
      </div>
      <article class="article-detail__markdown">
        <app-markdown-preview
          class="article-detail__markdown__preview"
          wide
          white-bg
          :markdown-content="markdownContent"
          :markdown-indexes="markdownIndexes"
          @parsedMarkdown="parsedMarkdown"
        />
        <app-markdown-index
          class="article-detail__markdown__index"
          :markdown-indexes="markdownIndexes"
        />
      </article>
    </section>
    <app-modal>
      <app-text
        ex-large
      >
        本当に削除しますか?
      </app-text>
      <app-button
        bg-danger
        @click="$emit('handleClick')"
      >
        削除
      </app-button>
    </app-modal>
  </div>
</template>

<script>
import {
  Heading, Button, RouterLink, MarkdownIndex, MarkdownPreview, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appButton: Button,
    appRouterLink: RouterLink,
    appMarkdownIndex: MarkdownIndex,
    appMarkdownPreview: MarkdownPreview,
    appText: Text,
  },
  props: {
    articleId: {
      type: Number,
      default: null,
    },
    markdownIndexes: {
      type: Array,
      default: () => [],
    },
    markdownContent: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
    },
  },
  methods: {
    parsedMarkdown() {
      this.$emit('parsedMarkdown');
    },
    openModal() {
      if (!this.access.delete) return;
      this.$emit('openModal', this.articleId);
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-detail {
  &__markdown {
    display: flex;
    align-items: flex-start;
    &__preview {
      width: 70%;
    }
    &__index {
      width: 30%;
    }
  }
  &__index {
    margin-left: 5%;
    width: 30%;
    height: 300px;
    background-color: #fff;
  }
}
.article-detail-links {
  display: flex;
  margin: 16px 0 0;
}
</style>
