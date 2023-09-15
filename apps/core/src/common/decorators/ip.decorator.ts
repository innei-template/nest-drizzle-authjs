import { FastifyRequest } from 'fastify'

import { getIp } from '@core/shared/utils/ip.util'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type IpRecord = {
  ip: string
  agent: string
}
export const IpLocation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>()
    const ip = getIp(request)
    const agent = request.headers['user-agent']
    return {
      ip,
      agent,
    }
  },
)
