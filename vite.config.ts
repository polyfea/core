/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const server = {
  host: '0.0.0.0',
  allowedHosts: ['localhost'],
  port: 8070,
};
export default 
  defineConfig({
  server,
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['tests/**/*.spec.*'],
          environment: 'happy-dom',
          execArgv: ['--localstorage-file', path.resolve(os.tmpdir(), `vitest-${process.pid}.localstorage`)],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: '.storybook',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
    reporters: ['junit', 'verbose'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'cobertura'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/.{git,temp}/**', '**/{vite,vitest}/**', '**/tests/', '.storybook/', 'coverage/', '**/mock*'],
      watermarks: {
        statements: [90, 100],
      },
      thresholds: {
        lines: 100,
        statements: 100
      }
    },
    outputFile: {
      junit: './coverage/junit-report.xml',
    },
  },
  plugins: [
    dts({
      strictOutput: true,
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => name + (format == 'es' ? '.mjs' : `.${format}.js`),
    },
    outDir: 'dist',
    sourcemap: true,
  },
});
