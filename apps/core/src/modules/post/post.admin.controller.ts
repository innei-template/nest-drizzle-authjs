import { AdminApiController } from '@core/common/decorators/api-controller.decorator'
import { Body, Post } from '@nestjs/common'

import { PostDto } from './post.dto'
import { PostService } from './post.service'

@AdminApiController('posts')
export class PostAdminController {
  constructor(private readonly service: PostService) {}

  @Post('/')
  async create(@Body() body: PostDto) {
    return this.service.create(body)
  }
}
