/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));


export default  defineConfig({
  build: {
    lib: {
      entry: {
        boot: 'src/boot.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => name + (format == 'es' ? '.mjs' : `.${format}.js`),
    },
    emptyOutDir: false,
    outDir: 'dist',
    sourcemap: true,
  },
});
