<template lang="html">
  <app-password-form
    :loading="loading"
    heading-text="パスワードの更新"
    :button-text="buttonText"
    :error-message="errorMessage"
    :done-message="doneMessage"
    @handleSubmit="setPassword"
  />
</template>

<script>
import { PasswordForm } from '@Components/molecules';

export default {
  components: { appPasswordForm: PasswordForm },
  computed: {
    loading() { // stateをこのコンポーネント内で使用できるリアクティブプロパティ化
      return this.$store.state.auth.loading;
    },
    buttonText() {
      return this.loading ? '更新中です...' : '更新';
    },
    errorMessage() {
      return this.$store.state.auth.errorMessage;
    },
    doneMessage() {
      return this.$store.state.auth.doneMessage;
    },
  },
  methods: {
    setPassword(data) { // dataには{password:newPassword: confirmNewPassword: '',}の値が入る。
      if (this.loading) return; // loadingがtrueだったら以下の処理は行わない
      this.$store.dispatch('auth/changePassword', data).then(() => { //  「ファイル名/アクション名」でdataを渡して実行
        this.$router.push('/');
      });
    },
  },
};
</script>
