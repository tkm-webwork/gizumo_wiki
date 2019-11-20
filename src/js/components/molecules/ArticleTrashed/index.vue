<template lang="html">
  <div class="article-trashed">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <!-- v-forのように同時に描画したいリストのアイテムがある場合、transition-groupコンポーネントを使うと良い -->
    <transition-group
      class="article-trashed__articles"
      name="fade"
      tag="ul"
    >
      <app-list-item
        :key="0"
        flex
        beetween
        align-items
        bg-white
        large
        border-bottom-gray
      >
        <app-text class="article-trashed__title">タイトル</app-text>
        <app-text class="article-trashed__title">本文</app-text>
        <app-text class="article-trashed__title">作成日</app-text>
      </app-list-item>
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
          {{ article.title | omittedText }}
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
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appText: Text,
  },
  filters: { // フィルタオプション。フィルタの定義(引数は対象データのコピー)jsの処理で実現する
    omittedText(val) { // 30文字でカット, ...をつける
      if (val.length >= 30) {
        return `${val.substr(0, 30)}...`;
      }
      return val;
    },
    editDate(val) { // 日付の表記の変更
      return new Date(val).toLocaleString('ja-JP', {
        era: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
      });
    },
  },
  props: { // 直接HTMLで使用することも、computedでそれに基づいたプロパティを定義することも可
    targetArray: { // 削除済みの記事一覧
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '削除済みドキュメント',
      required: true,
    },
  },
  computed: { // 孫はpropsの監視をして必要な処理を行う
    articleTitle() {
      return `${this.title}の一覧`;
    },
  },
};
</script>
<!-- transitionタグのname = "fade"がenter,leaveの前につく -->
<style lang="postcss" scoped>
  .article-trashed {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    /* white-space: nowrap; → 改行をさせない。overflow: hidden; → 収まらない部分は非表示 */
    &__title {
      margin-left: 10px;
      width: 21%;
    }
  }
</style>
