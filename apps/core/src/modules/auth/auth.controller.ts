import { Get, Post, Req, Res } from '@nestjs/common'
import { ApiController } from '@core/common/decorators/api-controller.decorator'

import { authHandler } from './auth.config'
import type { FastifyReply, FastifyRequest } from 'fastify'

@ApiController('auth')
export class AuthController {
  @Post('/signin/*')
  async handle2(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return authHandler(req, res)
  }
  @Get('/*')
  @Post('/*')
  async handle(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return authHandler(req, res)
  }
}
