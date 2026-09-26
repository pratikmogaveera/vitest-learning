import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: ['./src/phase-7/db.ts'],
    },
  },
});
