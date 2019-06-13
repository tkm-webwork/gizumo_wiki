<template>
  <div>
    <app-heading
      class="category-management-list-head"
      :level="2"
    >
      カテゴリー一覧
    </app-heading>
    <div class="category-management-list-scroll">
      <table class="category-management-list-table">
        <thead>
          <tr class="category-management-list-table-head-row">
            <th
              v-for="(thead, index) in theads"
              :key="index"
              class="category-management-list-table-head-title"
            >
              {{ thead }}
            </th>
          </tr>
        </thead>
        <tbody class="category-management-list-table-body">
          <tr
            v-for="category in categories"
            :key="category.id"
            class="category-management-list-table-body-row"
          >
            <td class="category-management-list-table-body-data is-category-name">
              <app-router-link
                key-color
                underline
                :to="`/articles?category=${category.name}`"
              >
                {{ category.name }}
              </app-router-link>
            </td>
            <td class="category-management-list-table-body-data is-update-button">
              <app-router-link
                bg-lightgreen
                large
                white
                round
                hover-opacity
                :to="`/categories/${category.id}`"
              >
                更新
              </app-router-link>
            </td>
            <td class="category-management-list-table-body-data is-delete-button">
              <app-button
                bg-danger
                round
                @click="openModal(category.id, category.name)"
              >
                削除
              </app-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <app-modal>
      <div class="category-management-modal-confirm">
        <app-text
          class="category-management-modal-confirm-title"
          exlarge
          tag="p"
        >
          下記のカテゴリーを削除しますか?
        </app-text>
        <app-text
          class="category-management-modal-confirm-name"
          theme-color
          tag="p"
        >
          {{ deleteCategoryName }}
        </app-text>
        <app-button
          class="category-management-modal-confirm-button"
          bg-danger
          round
          @click="handleClick"
        >
          削除する
        </app-button>
      </div>
    </app-modal>
  </div>
</template>

<script>
import {
  Heading, RouterLink, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
  },
  props: {
    theads: {
      type: Array,
      default() {
        return [];
      },
    },
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    deleteCategoryName: {
      type: String,
      default: '',
    },
  },
  methods: {
    openModal(categoryId, categoryName) {
      this.$emit('openModal', categoryId, categoryName);
    },
    handleClick() {
      this.$emit('handleClick');
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-management-list-scroll {
  overflow: scroll;
  white-space: nowrap;
}
.category-management-list-table {
  padding: 16px;
  height: 600px;
  margin-top: 16px;
  display: block;
}
.category-management-list-table-head-title {
  width: 200px;
  font-size: 16px;
  font-weight: bold;
  background-color: var(--themeColor);
  color: var(--white);
  padding: 16px;
  border-collapse: collapse;
  border: 1px solid var(--white);
}
.category-management-list-table-body {
  &-row {
    &:nth-child(even) {
      background-color: var(--separatorColor);
      .category-management-list-table-body-data {
        border: 1px solid var(--white);
      }
    }
    &:nth-child(odd) {
      background-color: var(--white);
      .category-management-list-table-body-data {
        border: 1px solid var(--separatorColor);
      }
    }
  }
  &-data {
    vertical-align: middle;
    text-align: center;
    border-collapse: collapse;
    padding: 16px 0;
    &.is-category-name {
      width: 200px;
    }
    &.is-delete-button {
      width: 100px;
    }
  }
}

.category-management-modal-confirm {
  text-align: center;
  &-name {
    margin-top: 16px;
    font-size: 16px;
    color: var(--themeColor);
  }
  &-button {
    margin-top: 48px;
  }
}
</style>
