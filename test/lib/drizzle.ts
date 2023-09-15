import { createDrizzle } from '@meta-muse/drizzle'

const dbUrl = process.env.DATABASE_URL!

export const drizzle = createDrizzle(dbUrl, {})
