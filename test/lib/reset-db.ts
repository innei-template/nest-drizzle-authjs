import { schema } from '@meta-muse/drizzle'

import { drizzle } from './drizzle'

// eslint-disable-next-line import/no-default-export
export default async () => {
  drizzle.transaction(async (db) => {
    await db.delete(schema.apiToken)
    await db.delete(schema.post)
    await db.delete(schema.oauth)
    await db.delete(schema.user)
  })
}
