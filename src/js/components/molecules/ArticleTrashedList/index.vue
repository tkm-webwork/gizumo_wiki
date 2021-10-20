<template lang="html">
  <div class="article-list">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <transition-group class="article-list__articles" name="fade" tag="ul">
      <app-list-item
        v-for="article in targetArray"
        :key="article.id"
        flex
        beetween
        align-items
        bg-white
        large
        border-bottom-gray
      >
        <app-heading :level="3" class="article-list__title">
          {{
            article.title
          }}
        </app-heading>
        <app-text class="article-list__created">
          作成日：{{ article.created_at | localization }}
        </app-text>
        <app-text class="article-list__content">
          {{ article.content }}
        </app-text>
      </app-list-item>
    </transition-group>
  </div>
</template>

<script>
import { Heading, ListItem, Text } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appText: Text,
  },
  filters: {
    localization(date) {
      const ts = Date.parse(date);
      const dt = new Date(ts);
      return dt.toLocaleDateString();
    },
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'すべて',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
    },
  },
  methods: {
    openModal(articleId) {
      if (!this.access.delete) return;
      this.$emit('openModal', articleId);
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-list {
  &__articles {
    margin-top: 16px;
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s;
    }
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  &__title {
    width: 60%;
  }
}
</style>
