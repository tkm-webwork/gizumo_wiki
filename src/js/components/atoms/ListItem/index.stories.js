import { storiesOf } from '@storybook/vue';
import note from './README.md';

storiesOf('ATOMS|ListItem', module)
  .add('default', () => {
    return {
      template: `<ul>
                  <app-list-item>
                    テキストが入ります
                  </app-list-item>
                </ul>
                `,
    }
  }, {notes: note});