import { storiesOf } from '@storybook/vue';
import storyRouter from 'storybook-vue-router';

import note from './README.md';

storiesOf('GLOBALS|Header', module)
  .addDecorator(storyRouter())
  .add('default', () => {
    return {
      template: `<app-header></app-header>`,
    }
  }, { notes: note });