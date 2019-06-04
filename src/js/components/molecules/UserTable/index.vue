<template lang="html">
  <table class="user-table">
    <thead class="user-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">{{ thead }}</th>
      </tr>
    </thead>
    <tbody class="user-table__body">
      <tr v-for="user in targetArray" :key="user.id">
        <td :class="user.username ? '' : 'is-disabled'">
          {{ user.username || '名前未設定' }}
        </td>
        <td>{{ user.accountname }}</td>
        <td>{{ user.role }}</td>
        <td>
          <app-router-link
            :to="`/users/${user.id}`"
            bg-keycolor
            small
            white
            round
          >
            詳細
          </app-router-link>
        </td>
        <td>
          <app-button
            bg-danger
            small
            round
          >
            削除
          </app-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import {
  RouterLink,
  Button,
  // Text,
} from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appButton: Button,
    // appText: Text,
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
  },
};
</script>

<style lang="css" scoped>
.user-table {
  width: 100%;
  background-color: #fff;
  th, td {
    padding: 5px;
    text-align: center;
    border: 1px solid var(--separatorColor);
  }
  &__head {
    font-weight: var(--bold);
    font-size: 14px;
    background-color: var(--separatorColor);
    th {
      border-right: 1px solid var(--white);
      &:last-child {
        border-right: 1px solid var(--separatorColor);
      }
    }
  }
  &__body {
    font-size: 14px;
    td {
      &.is-disabled {
        color: var(--disabledColor);
        font-size: 12px;
      }
    }
  }
}
</style>
