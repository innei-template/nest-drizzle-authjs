import { resolve } from 'node:path'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import * as schema from './schema'
import type { DrizzleConfig } from 'drizzle-orm'

export const createDrizzle = (
  url: string,
  options: Omit<DrizzleConfig, 'schema'>,
) => {
  const client = postgres(url, {})
  return drizzle(client, {
    schema,
    ...options,
  })
}

export const migrateDb = async (url: string) => {
  const migrationConnection = postgres(url, { max: 1 })

  await migrate(drizzle(migrationConnection), {
    migrationsFolder: resolve(__dirname, '.'),
  })
}

export { schema }

export * from 'drizzle-orm'
