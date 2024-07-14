import { resolve } from 'node:path'
import swc from 'unplugin-swc'
import tsconfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// if (
//   existsSync(
//     path.resolve(__dirname, '../../node_modules/.cache/redis-memory-server'),
//   )
// ) {
//   cpSync(
//     path.resolve(__dirname, '../../node_modules/.cache/redis-memory-server'),
//     path.resolve(__dirname, './node_modules/.cache/redis-memory-server'),
//     { recursive: true },
//   )
// }

export default defineConfig({
  root: './',
  test: {
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],

    threads: false,
    globals: true,
    setupFiles: [resolve(__dirname, './setup-file.ts')],
    environment: 'node',
    includeSource: [resolve(__dirname, '.')],
  },
  optimizeDeps: {
    needsInterop: ['lodash'],
  },
  resolve: {
    alias: [
      {
        find: 'zx-cjs',
        replacement: 'zx',
      },
      {
        find: '@core/app.config',
        replacement: resolve(
          __dirname,
          '../apps/core/src/app.config.testing.ts',
        ),
      },
      {
        find: /^@core\/(.+)/,
        replacement: resolve(__dirname, '../apps/core/src/$1'),
      },
      {
        find: '@packages/drizzle',
        replacement: resolve(__dirname, '../drizzle/index.ts'),
      },

      {
        find: '@packages/utils',
        replacement: resolve(__dirname, '../packages/utils/index.ts'),
      },
    ],
  },

  // esbuild can not emit ts metadata
  esbuild: false,

  plugins: [
    swc.vite(),
    tsconfigPath({
      projects: [
        resolve(__dirname, './tsconfig.json'),
        // resolve(__dirname, './tsconfig.json'),
      ],
    }),
  ],
})
