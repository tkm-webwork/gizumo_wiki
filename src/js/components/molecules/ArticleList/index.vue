<template lang="html">
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
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
    <app-router-link
      to="articles/trashed"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__add-link"
    >
      削除済みドキュメント一覧
    </app-router-link>
    <app-router-link
      to="articles/author_list"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__add-link"
    >
      作者ごとのドキュメント一覧
    </app-router-link>

    <transition-group
      class="article-list__articles"
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
            :disabled="!access.delete"
            @click="openModal(article.id)"
          >
            {{ buttonText }}
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
    <div class="pageNation clearfix">
      <button
        class="pageNation__button pageNation__button-back"
        type="button"
        :disabled="currentArticlePage === 1"
        :class="{ disable: currentArticlePage === 1 }"
        @click="$emit('minusArticlePage')"
      >
        <i class="fas fa-arrow-circle-left" />前へ
      </button>
      <button
        class="pageNation__button pageNation__button-next"
        type="button"
        :disabled="currentArticlePage === lastPage"
        :class="{ disable: currentArticlePage === lastPage }"
        @click="$emit('plusArticlePage')"
      >
        次へ<i class="fas fa-arrow-circle-right" />
      </button>
    </div>
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
  props: { // 直接HTMLで使用することも、computedでそれに基づいたプロパティを定義することも可
    className: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'すべて',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
    currentArticlePage: {
      type: Number,
      default: 1,
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    doneMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    lastPage: {
      type: Number,
      default: null,
    },
  },
  computed: { // 孫はpropsの監視をして必要な処理を行う
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
  .clearfix::after {
      clear:both;
      display: block;
      content: "";
  }
  .article-list {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
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
    &__add-link {
      margin-top: 16px;
      margin-left: 16px;
    }
    &__links {
      *:not(first-child) {
        margin-left: 16px;
      }
    }
    &__notice--create {
      margin-bottom: 16px;
    }
  }
  .pageNation {
    margin: 0 auto;
    &__button {
      font-size: 20px;
      color: var(--themeColor);
    }
    &__button-back {
      float: left;
    }
    &__button-next {
      float: right;
    }
  }
  .disable{
    color: var(--disabledColor);
    cursor: default;
  }
</style>
