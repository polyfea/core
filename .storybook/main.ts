import type { StorybookConfig } from "@storybook/web-components-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
        port: 8006,

        proxy: {
          "/api/v1": {
            target: "http://localhost",
            changeOrigin: true,
          },
          "/api/cache/attributes": {
            target: "http://localhost",
            changeOrigin: true,
          },
          "/api/v1/ws": {
            target: "ws://localhost",
            ws: true,
            changeOrigin: true,
          },
        },
      },

    });
  },
};

export default config;
