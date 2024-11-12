import 'reflect-metadata'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    include: ['./**/**/*.e2e-spec.ts'],
    setupFiles: './test/vitest.setup.ts',
    dir: 'src',
  },
})
