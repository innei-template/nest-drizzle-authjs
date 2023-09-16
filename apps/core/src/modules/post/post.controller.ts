import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { Get, Query } from '@nestjs/common'

import { PostPagerDto } from './post.dto'
import { PostService } from './post.service'

@ApiController('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Get('/')
  async gets(@Query() query: PostPagerDto) {
    const paginate = await this.service.getPosts({
      page: query.page,
      pageSize: query.size,
    })

    return paginate
  }
}
