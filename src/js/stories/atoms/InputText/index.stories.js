import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';

import note from './README.md';

const classNameDefaultValue = 'none';

const classNameOptions = {
  'none': '',
  'login-input': 'login-input',
};

const inputTypeDefaultValue = 'text'

const inputTypeOptions = {
  text: 'text',
  checkbox: 'checkbox',
  textarea: 'textarea',
  radio: 'radio',
  password: 'password',
  file: 'file',
  hidden: 'hidden',
  submit: 'submit',
  reset: 'reset',
  button: 'button',
  image: 'image',
}

storiesOf('ATOMS|inputText', module)
  .addDecorator(withKnobs)
  .add('inputText:default', () => {
    return {
      template: `<input-text
                  :name="name"
                  :class="['inputText-input', className]"
                  :input-type="inputType"
                  :input-rquired="inputRquired"
                  :input-value="inputValue"
                />`,
      props: {
        label: {
          type: String,
          default: text('label', 'Label'),
        },
        className: {
          type: String,
          default: select('className', classNameOptions, classNameDefaultValue),
        },
        name: {
          type: String,
          default: 'inputName',
        },
        inputType: {
          type: String,
          default: select('inputType', inputTypeOptions, inputTypeDefaultValue),
        },
        inputRquired: {
          type: Boolean,
          default: boolean('inputRquired', false),
        },
        inputValue: {
          type: String,
          default: text('inputValue', ''),
        },
      },
    }
  }, { notes: note });