import { Config } from 'drizzle-kit'

export default {
  schema: './schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
