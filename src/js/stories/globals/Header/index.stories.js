import { storiesOf } from '@storybook/vue';
import { withNotes } from '@storybook/addon-notes';

import note from './README.md';

storiesOf('GLOBALS|Header', module)
  .addDecorator(withNotes)
  .add('default', () => {
    return {
      template: '<app-header />'
    }
  }, { notes: note });