/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    typecheck: { enabled: true, ignoreSourceErrors: true },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,astro}'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test-d.ts', 'src/types.ts'],
    },
  },
});
