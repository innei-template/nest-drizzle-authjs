import { createDrizzle } from '@packages/drizzle'

const dbUrl = process.env.DATABASE_URL!

export const drizzle = createDrizzle(dbUrl, {})
