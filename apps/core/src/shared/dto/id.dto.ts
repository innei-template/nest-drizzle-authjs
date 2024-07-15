import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { z } from 'zod'

export class SnowflakeIdDto extends createZodDto(
  z.object({
    id: z
      .string()
      .regex(/^\d{18}$/)
      .openapi({ description: 'Snowflake ID' }),
  }),
) {}
