import { getIp } from '@core/shared/utils/ip.util'
import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { FastifyRequest } from 'fastify'

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
