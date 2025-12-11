/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const server = {
  host: '0.0.0.0',
  allowedHosts: ['localhost'],
  port: 8070
  // proxy: {
  //   '/api/v1': {
  //     target: 'http://localhost',
  //     changeOrigin: true
  //   },
  //   '/api/cache/attributes': {
  //     target: 'http://localhost',
  //     changeOrigin: true
  //   },
  //   '/api/v1/ws': {
  //     target: 'ws://localhost',
  //     ws: true,
  //     changeOrigin: true
  //   }
  // }
};
export default defineConfig({
  server,
  test: {
    projects: [{
      extends: true,
      plugins: [storybookTest({
        configDir: '.storybook'
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }],
    reporters: ['junit', 'verbose'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'cobertura'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/.{git,temp}/**', '**/{vite,vitest}/**', "./*.ts", '**/tests/', '.storybook/', 'coverage/', '**/mock*'],
      watermarks: {
        statements: [90, 100]
      }
    },
    outputFile: {
      junit: './coverage/junit-report.xml'
    }
  },
  plugins: [dts({
    strictOutput: true,
    entryRoot: "src"
  })],
  build: {
    lib: {
      entry: {
        index: 'src/core/index.ts'
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => name + (format == "es" ? ".mjs" : `.${format}.js`)
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [/^lit/, /^@lit\/localize/]
    }
  }
});