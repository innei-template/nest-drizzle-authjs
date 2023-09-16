import { DatabaseService } from '@core/processors/database/database.service'
import { InferInsertModel, InferSelectModel, schema } from '@meta-muse/drizzle'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PostService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: InferInsertModel<typeof schema.post>) {
    const model = await this.db.drizzle
      .insert(schema.post)
      .values(data)
      .returning()

    return model[0]
  }

  async getPosts(
    config: {
      columns?: Record<keyof InferSelectModel<typeof schema.post>, boolean>
      page?: number
      pageSize?: number

      where?: any
    } = {},
  ) {
    const { page = 1, pageSize = 10, where } = config
    return this.db.drizzle.query.post.findMany({
      columns: config.columns,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      where,
    })
  }
}
