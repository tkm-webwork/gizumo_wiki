import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import note from './README.md';

storiesOf('ATOMS|Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `
                <app-select
                  :name="name"
                  :value="value"
                >
                <option value="---">---</option>
                  <option value="ダミーテキスト1">ダミーテキスト1</option>
                  <option value="ダミーテキスト2">ダミーテキスト2</option>
                  <option value="ダミーテキスト3">ダミーテキスト3</option>
                </app-select>
                `,
      props: {
        name: {
          type: String,
          default: text('name', 'ここにフィールド名を入力します'),
        },
        value: {
          type: String,
          default: '---',
        }
      }
    }
  },{ notes: note })