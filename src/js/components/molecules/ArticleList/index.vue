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
        v-for="article in targetArray"
        :key="article.id"
        flex
        beetween
        align-items
        bg-white
        large
      >
        <app-text
          class="article-list-title"
        >
          {{ article.title }}
        </app-text>
        <div class="article-list-links">
          <app-router-link
            :to="`/articles/${article.id}`"
            bg-theme-color
            large
            white
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${article.id}/edit`"
            white
            bg-lightgreen
            large
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
            @click="openModal(article.id)"
          >
            削除
          </app-button>
        </div>
      </app-list-item>
    </ul>
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
  methods: {
    openModal(articleId) {
      this.$emit('openModal', articleId);
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
