import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import note from './README.md';

const classNameDefaultValue = 'none';

const classNameOptions = {
  'none': '',
  'login-button': 'login-button',
}

storiesOf('ATOMS|Button', module)
  .addDecorator(withKnobs)
  .add('Button:default', () => {
      return {
      template: '<app-button :text="text" :class="[\'button\', className]" />',
      props: {
        text: {
          type: String,
          default: text('text', 'ボタン'),
        },
        className: {
          type: String,
          default: select('className', classNameOptions, classNameDefaultValue),
        },
      },
    }
  },{ notes: note });