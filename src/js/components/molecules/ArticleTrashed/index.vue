<template lang="html">
  <div class="article-trashed">
    <app-heading>削除記事一覧</app-heading>
    <table class="article-trashed__table">
      <thead class="article-trashed__table__head">
        <tr>
          <th
            v-for="(thead, index) in theads"
            :key="index"
          >
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <tbody class="article-trashed__table__body">
        <tr
          v-for="article in deletedArticleList"
          :key="article.id"
          class="article-trashed__table__body__tr"
        >
          <td class="article-trashed__table__body__tr__createdTd">
            <app-text>
              {{ createdDate(article.created_at) }}
            </app-text>
          </td>
          <td class="article-trashed__table__body__tr__titleTd">
            <app-text>
              {{ titleText(article.title) }}
            </app-text>
          </td>
          <td class="article-trashed__table__body__tr__contentTd">
            <app-text>
              {{ contentText(article.content) }}
            </app-text>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Heading, Text } from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default: () => [],
    },
    deletedArticleList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createdDate(timestamp) {
      const time = timestamp;
      const year = time.substr(0, 4);
      const month = time.substr(5, 1) === '0'
        ? time.substr(6, 1) : time.substr(5, 2);
      const day = time.substr(8, 1) === '0'
        ? time.substr(9, 1) : time.substr(8, 2);
      return `${year}年${month}月${day}日`;
      // 時間入れる用
      // const hour = time.substr(11, 2);
      // const min = time.substr(14, 2);
      // const sec = time.substr(17, 2);
      // return `${year}年${month}月${day}日 ${hour}:${min}:${sec}`;
    },
    titleText(title) {
      let titleText = title;
      if (titleText.length >= 30) {
        titleText = titleText.substr(0, 30);
        titleText += '…';
      }
      return titleText;
    },
    contentText(content) {
      let contentText = content;
      if (contentText.length >= 30) {
        contentText = contentText.substr(0, 30);
        contentText += '…';
      }
      return contentText;
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-trashed {
  &__table {
    margin-top: 10px;
    width: 100%;
    tr {
      border-bottom: 1px solid var(--separatorColor);
    }
    &__head {
      th {
        padding: 5px 10px;
        vertical-align: middle;
        text-align: left;
      }
    }
    &__body {
      td {
        padding: 10px;
        vertical-align: middle;
      }
      &__tr {
        &__created {
          width: 10%;
        }
        &__title {
          width: 45%;
        }
        &__content {
          width: 45%;
        }
      }
    }
  }
}
</style>
