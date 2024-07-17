import { Inject, type NestMiddleware } from '@nestjs/common'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { AuthConfigInjectKey } from './auth.constant'
import { CreateAuth, ServerAuthConfig } from './auth.implement'

export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(AuthConfigInjectKey) private readonly config: ServerAuthConfig,
  ) {}
  authHandler = CreateAuth(this.config)
  async use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    if (req.method !== 'GET' && req.method !== 'POST') {
      next()
      return
    }

    await this.authHandler(req, res)

    next()
  }
}
