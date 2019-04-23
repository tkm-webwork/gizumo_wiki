<template lang="html">
  <ul :class="className">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
    >
      <router-link
        :to="item.path"
        class="sidebar-list-link"
        exact-active-class="is-active"
      >
        {{ item.name }}
      </router-link>
    </app-list-item>
  </ul>
</template>

<script>
import { ListItem } from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
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
  },
};
</script>

<style lang="scss" scoped>
.sidebar-list {
  & > li {
  }
  &-link {
    padding: 7px;
    width: 100%;
    color: #fff;
    border-radius: 5px;
    transition: all .5s;
    &.is-active {
      color: $darkerColor;
      font-weight: bold;
      background-color: #fff;
    }
  }
}
</style>
