import type { NestMiddleware } from '@nestjs/common'
import type { IncomingMessage, ServerResponse } from 'http'
import { authHandler } from './auth.config'

export class AuthMiddleware implements NestMiddleware {
  async use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    if (req.method !== 'GET' && req.method !== 'POST') {
      next()
      return
    }

    await authHandler(req, res)

    next()
  }
}
