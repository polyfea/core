import { resolve } from 'path'
// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      
      entry: resolve(__dirname, 'src/core/boot.ts'),
      name: 'polyfea-boot',      
      fileName: 'boot',
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/core/**/*.spec.ts'],
  }

})