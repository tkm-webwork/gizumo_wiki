import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import note from './README.md';

storiesOf('ATOMS|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => {
      return {
      template: `<app-button
                    block
                  >
                    テキスト
                </app-button>`,
      props: {
        buttonType: {
          type: String,
          default: text('buttonType', 'button'),
        },
        block: {
          type: Boolean,
          default: boolean('block', false),
        },
        round: {
          type: Boolean,
          default: boolean('round', false),
        },
      },
      computed: {
        classes() {
          return {
            button: true,
            'button--block': this.block,
            'button--large': this.large,
            'button--small': this.small,
            'button--round': this.round,
            'button--error': this.error,
            'button--disabled': this.disabled,
            'button--caution': this.caution,
          };
        },
      },
    }
  },{ notes: note })
  .add('disabled', () => {
    return {
      template: `<app-button
                    :classes="classes"
                    :disabled="disabled"
                  >
                    テキスト
                </app-button>`,
    props: {
      buttonType: {
        type: String,
        default: text('buttonType', 'button'),
      },
      block: {
        type: Boolean,
        default: boolean('block', false),
      },
      round: {
        type: Boolean,
        default: boolean('round', false),
      },
      disabled: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      classes() {
        return {
          button: true,
          'button--block': this.block,
          'button--large': this.large,
          'button--small': this.small,
          'button--round': this.round,
          'button--error': this.error,
          'button--disabled': this.disabled,
          'button--caution': this.caution,
        };
      },
    },
  }
},{ notes: note });