import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  target: 'es2020',
  entry: ['index.ts', '_.ts', 'id.ts', 'snowflake.ts'],
  dts: true,
  format: ['cjs', 'esm'],
})
