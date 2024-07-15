import { createZodDto } from '@wahyubucil/nestjs-zod-openapi'
import { createSelectSchema } from 'drizzle-zod'
import { users } from '@packages/drizzle/schema'

const selectUserSchema = createSelectSchema(users, {
  name: (schema) => schema.name.openapi({ description: 'User name' }),
})
export class UserSessionDto extends createZodDto(selectUserSchema) {}
