import type { StorybookConfig } from '@storybook/core-common';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
const config: StorybookConfig = {
  core: {},
  stories: ['../src/app/**/*.mdx', '../src/app/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-mdx-gfm'],
  async viteFinal(config: any) {
    return mergeConfig(config, {
      plugins: [viteTsConfigPaths({
        root: '../../../'
      })]
    });
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: (prop: {
        parent: {
          fileName: string;
        };
      }) => prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true
    }
  },
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
};
module.exports = config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/packages/storybook/documents/custom-builder-configs