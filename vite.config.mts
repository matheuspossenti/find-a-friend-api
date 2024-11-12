import 'reflect-metadata'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    include: ['./**/**/*.spec.ts'],
    exclude: ['**/*.e2e-spec.ts'],
    dir: 'src',
  },
})
