import { createInsertSchema } from 'drizzle-zod'

import { createProjectionOmit } from '@core/shared/utils/schema.util'
import { schema } from '@meta-muse/drizzle'
import type { z } from 'zod'

export const postInputSchema = createInsertSchema(schema.post)

export const PostSchemaProjection = createProjectionOmit(
  postInputSchema.shape,
  [],
  true,
)
export const PostSchemaSerializeProjection = createProjectionOmit(
  postInputSchema.shape,
  [],
)

export type PostInputSchema = Omit<
  z.infer<typeof postInputSchema>,
  keyof typeof PostSchemaProjection
>

// export const PostIncluded: Prisma.PostInclude = {
//   category: true,
//   related: {
//     select: {
//       id: true,
//       title: true,
//       category: {
//         select: {
//           id: true,
//           name: true,
//           slug: true,
//         },
//       },
//       slug: true,
//       created: true,
//     },
//   },
// }
