<template lang="html">
  <div class="article-author-list">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <!-- v-forのように同時に描画したいリストのアイテムがある場合、transition-groupコンポーネントを使うと良い -->
    <app-accordion
      v-for="author in editedAuthorList"
      :key="author"
      flex
      beetween
      align-items
      theme-color
      large
      border-bottom-theme-color
    >
      <template v-slot:title>
        {{ author }}
      </template>
      <template v-slot:body>
        <div
          v-for="article in targetArray"
          :key="article.id"
        >
          <app-list-item
            flex
            beetween
            align-items
            bg-white
            large
            border-bottom-gray
            :class="{ 'article-author-list__omit-article'
            :article.user.account_name !== author }"
          >
            <app-text
              class="article-author-list__content"
            >
              {{ article.title | omittedText }}
            </app-text>
            <app-text
              class="article-author-list__content"
            >
              {{ article.content | omittedText }}
            </app-text>
            <app-text
              class="article-author-list__content"
            >
              {{ article.created_at | editDate }}
            </app-text>
          </app-list-item>
        </div>
      </template>
    </app-accordion>
  </div>
</template>

<script>
import {
  Heading,
  Accordion,
  ListItem,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appAccordion: Accordion,
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
        era: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    },
  },
  props: { // 直接HTMLで使用することも、computedでそれに基づいたプロパティを定義することも可
    targetArray: {
      type: Array,
      default: () => [],
    },
    editedAuthorList: { // 重複を取り除いた作者の取得
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '作者別記事',
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
  .article-author-list {
    margin-top: 20px;
    &__omit-article{
      display: none;
    }
    &__content {
      width: 60%;
    }
  }
</style>
