import { DrizzleConfig } from 'drizzle-orm'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import * as schema from './schema'

export const createDrizzle = (
  url: string,
  options: Omit<DrizzleConfig, 'schema'>,
) => {
  const migrationClient = postgres(url, { max: 1 })

  return drizzle(migrationClient, {
    schema,
    ...options,
  })
}

export const migrateDb = async (db: NodePgDatabase<typeof schema>) => {
  await migrate(db, { migrationsFolder: 'drizzle' })
}

export { schema }

export * from 'drizzle-orm'
