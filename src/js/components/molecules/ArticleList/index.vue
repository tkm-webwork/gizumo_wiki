<template lang="html">
  <div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
      key-color
      white
      bg-lightgreen
      large
      class="article-list-create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <ul
      :class="classes"
      class="article-list"
    >
      <app-list-item
        v-for="item in targetArray"
        :key="item.article.id"
        flex
        beetween
        align-items
        bg-white
        large
      >
        <app-text
          class="article-list-title"
        >
          {{ item.article.title }}
        </app-text>
        <div class="article-list-links">
          <app-router-link
            :to="`/articles/${item.article.id}`"
            bg-keycolor
            large
            white
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${item.article.id}/edit`"
            white
            bg-lightgreen
            large
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
          >
            削除
          </app-button>
        </div>
      </app-list-item>
    </ul>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
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
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    classes() {
      return {
        'article-list--bordergray': this.borderGray,
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-list-title {
    width: 60%;
  }
  .article-list-create-link {
    margin-top:  16px;
  }
  .article-list {
    margin-top: 16px;
  }
  .article-list-links {
    *:not(first-child) {
      margin-left: 16px;
    }
  }
  .article-list--bordergray li {
    border-bottom: 1px solid var(--separatorColor);
  }
  .article-list--bordergray li:first-child {
    border-top: 1px solid var(--separatorColor);
  }

</style>
