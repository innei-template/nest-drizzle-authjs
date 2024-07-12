import type { FastifyRequest } from 'fastify'

import type { ExecutionContext } from '@nestjs/common'

export function getNestExecutionContextRequest(
  context: ExecutionContext,
): FastifyRequest & { owner?: any } & Record<string, any> {
  return context.switchToHttp().getRequest<FastifyRequest>()
}
