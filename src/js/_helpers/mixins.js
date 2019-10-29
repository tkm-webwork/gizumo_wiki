export default {
  methods: {
    toggleModal() { // $rootでルートインスタンスへアクセス。toggleModalの実行。
      this.$root.$emit('toggleModal'); // 結局はstoreのカスタムイベントを発火している。
    },
  },
};
