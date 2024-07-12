import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { UserSchemaProjection, userSchema } from '../user.protect'

export class UserRegisterDto extends createZodDto(
  userSchema.omit(UserSchemaProjection).extend({
    socialIds: z.record(z.string(), z.string()).optional(),
  }),
) {}
