import { prisma } from './prisma'

// eslint-disable-next-line import/no-default-export
export default async () => {
  await prisma.$transaction(async (c) => {
    await Promise.all([
      c.user.deleteMany(),
      c.post.deleteMany(),
      c.postTag.deleteMany(),
      c.oAuth.deleteMany(),
      c.postImage.deleteMany(),
    ])

    await c.category.deleteMany()
  })
}
