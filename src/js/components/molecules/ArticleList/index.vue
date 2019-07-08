<template lang="html">
  <div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <transition-group
      class="article-list"
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
          class="article-list__title"
        >
          {{ article.title }}
        </app-text>
        <div class="article-list__links">
          <app-router-link
            :to="`/articles/${article.id}`"
            theme-color
            underline
            hover-opacity
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${article.id}/edit`"
            white
            bg-lightgreen
            small
            round
            hover-opacity
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
            small
            round
            hover-opacity
            @click="openModal(article.id)"
          >
            削除
          </app-button>
        </div>
      </app-list-item>
    </transition-group>
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
  },
  methods: {
    openModal(articleId) {
      this.$emit('openModal', articleId);
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-list {
    margin-top: 16px;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__title {
      width: 60%;
    }
    &__create-link {
      margin-top: 16px;
    }
    &__links {
      *:not(first-child) {
        margin-left: 16px;
      }
    }
  }

</style>
