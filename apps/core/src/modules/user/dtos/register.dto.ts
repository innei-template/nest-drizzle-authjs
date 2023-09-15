import { createInsertSchema } from 'drizzle-zod'
import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { schema } from '@meta-muse/drizzle'

import { UserSchemaProjection } from '../user.protect'

export class UserRegisterDto extends createZodDto(
  createInsertSchema(schema.user)
    .omit(UserSchemaProjection)
    .extend({
      socialIds: z.record(z.string(), z.string()).optional(),
    }),
) {}
