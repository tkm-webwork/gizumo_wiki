<template>
  <app-modal>
    <div class="delete-modal">
      <app-text>本当に削除しますか？</app-text>

      <div class="delete-modal__content">
        <div class="delete-modal__button">
          <app-button
            disabled
            block
            pointer
            @click="closeModal"
          >
            戻る
          </app-button>
        </div>

        <div class="delete-modal__button">
          <app-button bg-danger block @click="excuteDelete">
            削除する
          </app-button>
        </div>
      </div>
    </div>
  </app-modal>
</template>

<script>
import { Modal, Text, Button } from '@Components/atoms';

export default {
  components: {
    appModal: Modal,
    appText: Text,
    appButton: Button,
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    excuteDelete() {
      this.$emit('excuteDelete');
    },
  },
};
</script>

<style lang="postcss" scoped>
.delete-modal {
  &__content {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  &__button {
    width: 47%;
  }
}
</style>
