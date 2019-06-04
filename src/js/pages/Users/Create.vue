<template lang="html">
  <section class="users-create">
    <app-heading :level="1">ユーザー作成</app-heading>
    <app-button
      small
      round
      bg-caution
      @click="back"
    >
      戻る
    </app-button>

    <form @submit.prevent="createUser">
      <div>
        <app-input
          v-validate="'required'"
          name="name"
          type="text"
          placeholder="ユーザー名"
          data-vv-as="ユーザー名"
          :error-messages="errors.collect('name')"
          :value="name"
          @updateValue="updateValue"
        />
      </div>
      <div>
        <app-input
          v-validate="'required|email'"
          name="email"
          type="text"
          placeholder="メールアドレス"
          data-vv-as="メールアドレス"
          :error-messages="errors.collect('email')"
          :value="email"
          @updateValue="updateValue"
        />
      </div>
      <div>
        <app-input
          v-validate="'required'"
          name="password"
          type="password"
          placeholder="パスワード"
          data-vv-as="パスワード"
          :error-messages="errors.collect('password')"
          :value="password"
          @updateValue="updateValue"
        />
      </div>

      <div v-if="errorMessage">
        <app-text bg-error>{{ errorMessage }}</app-text>
      </div>

      <div>
        <app-button
          button-type="submit"
          :disabled="loading ? true : false"
          block
        >
          <template v-if="loading">
            <span>作成中です...</span>
          </template>
          <template v-else>
            <span>作成</span>
          </template>
        </app-button>
      </div>
    </form>
  </section>
</template>

<script>
import {
  Button,
  Heading,
  Input,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appButton: Button,
    appHeading: Heading,
    appInput: Input,
    appText: Text,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    updateValue($event) {
      this[$event.target.name] = $event.target.value;
    },
    createUser() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.$store.dispatch('createUser', {
            name: this.name,
            email: this.email,
            password: this.password,
          });
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
