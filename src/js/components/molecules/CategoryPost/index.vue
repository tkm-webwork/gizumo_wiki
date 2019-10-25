<template lang="html">
  <form @submit.prevent="addCategory">
    <app-heading :level="1">カテゴリー管理</app-heading>
    <app-input
      v-validate="'required'"
      name="category"
      type="text"
      placeholder="追加するカテゴリー名を入力してください"
      data-vv-as="カテゴリー名"
      :error-messages="errors.collect('category')"
      :value="category"
      @updateValue="$emit('udpateValue', $event)"
    />
    <!--
      ここで指定したnameと同名のプロパティが親側で紐づけられ、valueが代入される。今回はcategory
      $eventにはイベントのデータが入っている。特定の属性値を取り出したければ
      「$event.target.属性」。inputの変化で@updateValueが発火。
    -->
    <app-button
      class="category-management-post__submit"
      round
      :disabled="disabled || !access.create"
      button-type="submit"
    >
      <!--
        disable属性→ボタンが非活性になる
        不要だと判断しbutton-type="submit"を削除。代わりに@click="addCategory"
        :disableは、処理中か否か/権限の有無 で属性に真偽値を与えている
      -->
      {{ buttonText }}
    </app-button>

    <div v-if="errorMessage" class="category-management-post__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="category-management-post__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
  </form>
</template>
<script>
import {
  Heading, Input, Button, Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appInput: Input,
    appButton: Button,
    appText: Text,
  },
  props: {
    category: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    buttonText() {
      if (!this.access.create) return '作成権限がありません'; // 権限無しのボタンテキスト
      return this.disabled ? '作成中...' : '作成'; // loading中か否かで切り替わるボタンのテキスト
    },
  },
  methods: {
    addCategory() {
      if (!this.access.create) return;
      this.$emit('clearMessage');
      this.$validator.validate().then((valid) => {
        if (valid) this.$emit('handleSubmit');
      });
    },
  },
};
</script>
<style lang="postcss" scoped>
.category-management-post {
  &__input {
    margin-top: 16px;
  }
  &__submit {
    margin-top: 16px;
  }
  &__notice {
    margin-top: 16px;
  }
}
</style>
