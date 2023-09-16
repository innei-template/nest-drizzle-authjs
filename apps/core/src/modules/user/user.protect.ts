import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

import { createProjectionOmit } from '@core/shared/utils/schema.util'
import { schema } from '@meta-muse/drizzle'

export const userSchema = createInsertSchema(schema.user)
export const UserSchemaProjection = createProjectionOmit(
  userSchema.shape,
  ['lastLoginIp', 'authCode', 'lastLoginTime'],
  true,
)

export const UserSchemaSerializeProjection = createProjectionOmit(
  userSchema.shape,
  ['password', 'authCode'],
)

export type UserSchema = z.infer<typeof userSchema>
