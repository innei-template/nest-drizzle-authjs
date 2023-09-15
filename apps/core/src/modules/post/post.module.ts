import { Module } from '@nestjs/common'

import { PostAdminController } from './post.admin.controller'
import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
  controllers: [PostController, PostAdminController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
