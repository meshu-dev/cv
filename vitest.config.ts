import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'json-summary'],
      include: ['app/**/*.tsx', 'pages/**/*.tsx'],
      exclude: ['**/*.test.tsx', '**/*.d.ts'],
      thresholds: {
        lines: 80,
      },
    },
    /**
     * Use 'globals: true' to unmount components after each test to 
     * ensure that tests are isolated from each other.
     **/
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
})
