export default {
  methods: {
    // ルートインスタンスへアクセス
    toggleModal() {
      this.$root.$emit('toggleModal');
    },
  },
};
