import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    include: ['./**/**/*.spec.ts'],
    exclude: ['**/*.e2e-spec.ts'],
    setupFiles: './test/vitest.setup.unit.ts',
    dir: 'src',
  },
})
