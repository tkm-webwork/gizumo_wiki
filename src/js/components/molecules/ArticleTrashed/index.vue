<template lang="html">
  <div>
    <section class="article-trashed">
      <app-heading :level="1">削除済み記事一覧</app-heading>
    </section>
    <section class="article-trashed">
      <p class="article-trashed__theme">
        記事タイトル
      </p>
      <p class="article-trashed__theme">
        記事コンテンツ
      </p>
      <p class="article-trashed__theme">
        記事作成日
      </p>
    </section>
    <section>
      <transition-group
        class="article-trashed__articles"
        name="fade"
        tag="ul"
      >
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
          <app-text
            class="article-trashed__title"
          >
            {{ article.title }}
          </app-text>
          <app-text
            class="article-trashed__title"
          >
            {{ article.content | omittedText }}
          </app-text>
          <app-text
            class="article-trashed__title"
          >
            {{ article.created_at | editDate }}
          </app-text>
        </app-list-item>
      </transition-group>
    </section>
  </div>
</template>

<script>
import {
  Heading, Text, ListItem,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appText: Text,
  },
  filters: {
    omittedText(val) { // valは取得してきている値
      if (val.length >= 30) {
        return `${val.substring(0, 30)}...`;
      }
      return val;
    },
    editDate(val) { // 日付の表記の変更(年ー月ー日ー時ー分ー秒)
      return val.substring(0, 19);
    },
  },
  props: {
    articleId: {
      type: Number,
      default: null,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
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
  },
};
</script>

<style lang="postcss" scoped>
  .article-trashed {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    &__title {
      width: 60%;
    }
    &__theme {
      width: 32%;
      display: inline-block;
      margin: 20px 0 0 10px;
      font-size: 18px;
      color: rgb(23, 193, 250);
    }
  }
</style>
