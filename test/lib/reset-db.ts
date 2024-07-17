import { schema as schemas } from '@packages/drizzle'

import { drizzle } from './drizzle'

const noop = () => {}
// eslint-disable-next-line import/no-default-export
export default async () => {
  drizzle
    .transaction(async (db) => {
      // for (const key in schemas) {
      //   console.log('key', key, schemas[key])
      //   await db.delete(schemas[key])
      // }
      await db.delete(schemas.users)
      await db.delete(schemas.accounts)
      await db.delete(schemas.authenticators)
      await db.delete(schemas.sessions)
      await db.delete(schemas.verificationTokens)
    })
    .catch(noop)
}
