import { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  out: './drizzle',
} satisfies Config
