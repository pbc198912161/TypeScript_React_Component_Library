// .storybook/preview.ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    // Global controls for all stories
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Default backgrounds
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',  value: '#0f1117' },
        { name: 'light', value: '#f8f9fa' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    // Viewport presets
    viewport: {
      viewports: {
        mobile:  { name: 'Mobile',  styles: { width: '375px',  height: '812px' } },
        tablet:  { name: 'Tablet',  styles: { width: '768px',  height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
    },
    // Docs page layout
    docs: {
      toc: true,
    },
  },
};

export default preview;
