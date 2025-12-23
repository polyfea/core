/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
    sourcemap: false,
    minify: 'terser', 
    terserOptions: {
      compress: true,
      mangle: true
    }
  },
});
