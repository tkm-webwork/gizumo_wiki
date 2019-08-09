import { withBackgrounds } from '@storybook/addon-backgrounds';
import { addParameters } from '@storybook/vue';
import backgrounds from "@storybook/addon-backgrounds";
import '@Css/global.css';
import '@Css/storybookoverride.css';

//atoms
import buttonStory from '@Components/atoms/Button/index.stories';
import inputStory from '@Components/atoms/Input/index.stories';
import headingStory from '@Components/atoms/Heading/index.stories';
import listItemStory from '@Components/atoms/ListItem/index.stories';
import routerLinkStory from '@Components/atoms/RouterLink/index.stories';
import textStory from '@Components/atoms/Text/index.stories';
import textareaStory from '@Components/atoms/Textarea/index.stories';
import markdownIndexStory from '@Components/atoms/MarkdownIndex/index.stories';
import markdownPreviewStory from '@Components/atoms/MarkdownPreview/index.stories';
import modalStory from '@Components/atoms/Modal/index.stories';
import selectStory from '@Components/atoms/Select/index.stories';