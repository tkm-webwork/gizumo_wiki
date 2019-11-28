<template lang="html">
  <div class="author_list">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <table class="author_list-table">
      <thead class="author_list-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="author_list-table__body">
        <tr
          v-for="user in targetArray"
          :key="user.id"
        >
          <td
            class="author_list__userName"
            @click="$emit('handleClick', user)"
          >
            <app-text tag="span" small>
              {{ user.name }}
              <a class="author_list__arrowMark">▼</a>
            </app-text>
          </td>
          <div v-if="actives.includes(user.id)">
            <td
              v-for="article in user.articles"
              :key="article.title"
              class="author_list__userTitle"
            >
              <app-text tag="span" small>{{ article.title }}</app-text>
            </td>
          </div>
        </tr>
      </transition-group>
    </table>
  </div>
</template>
<script>
import {
  Text, Heading,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    theads: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '削除済み記事',
    },
    actives: {
      type: Array,
      required: true,
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
  },
};
</script>
<style lang="postcss" scoped>
.author_list-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
  tr {
    border-bottom: 5px solid var(--separatorColor);
    display: block;
    .author_list__userName {
      cursor: pointer;
    }
    .author_list__arrowMark{
      float: right;
    }
  }
  &__head {
    th {
      padding: 5px 10px;
      vertical-align: middle;
    }
  }
  &__body {
    td {
      padding: 10px;
      vertical-align: middle;
      display: block;
      border-bottom: 1px solid var(--separatorColor);
      &.is-disabled {
        color: var(--disabledColor);
        font-size: 12px;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
