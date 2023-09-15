import { ApiController } from '@core/common/decorators/api-controller.decorator'

import { PostService } from './post.service'

@ApiController('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  // @Get('/')
  // async gets(@Query() query: PostPagerDto) {
  //   const paginate = await this.service.paginatePosts(query, {
  //     isPublished: true,
  //   })
  //   return paginate
  // }

  // @Get('/:id')
  // async get(@Param() param: SnowflakeIdDto) {
  //   const { id } = param
  //   const data = await this.service.getPostById(id)
  //   this.guardPostCanVisit(data)
  //   return data
  // }

  // @Get('/latest')
  // async getLatest() {
  //   const data = await this.service.getLastPost()
  //   this.guardPostCanVisit(data)

  //   return data
  // }

  // @Get('/:category/:slug')
  // async getByCateAndSlug(@Param() params: CategoryAndSlugDto) {
  //   const { category, slug } = params

  //   const data = await this.service.getPostBySlug(slug, category)
  //   if (!data) {
  //     throw new BizException(ErrorCodeEnum.PostNotFound)
  //   }

  //   this.guardPostCanVisit(data)

  //   return data
  // }

  // guardPostCanVisit(data?: Post | null) {
  //   if (!data) return data
  //   if (!data.isPublished) {
  //     throw new BizException(ErrorCodeEnum.PostNotFound)
  //   }

  //   return data
  // }
}
