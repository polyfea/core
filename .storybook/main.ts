
import { mergeConfig } from "vite";
import { defineMain } from '@storybook/web-components-vite/node';

export default defineMain({
 
  stories: [ "../tests/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },


  staticDirs: ["./static"],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      server: {
        host: true,
        port: 8007,
        watch: {
          usePolling: true,
          interval: 1000,
        },
      },

    });
  },
});

