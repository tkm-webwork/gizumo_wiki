<template lang="html">
  <table class="user-table">
    <thead class="user-table__head">
      <tr>
        <th v-for="(thead, index) in theads" :key="index">{{ thead }}</th>
      </tr>
    </thead>
    <tbody class="user-table__body">
      <tr v-for="user in targetArray" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.accountname }}</td>
        <td>{{ user.role }}</td>
        <td>
          <app-router-link
            :to="`/users/${user.id}`"
            bg-keycolor
            large
            white
          >
            詳細
          </app-router-link>
        </td>
        <td>
          <app-button
            bg-danger
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
    border: 1px solid var(--separatorColor);
  }
  &__head {
    background-color: var(--separatorColor);
  }
}
</style>
