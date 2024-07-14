/* eslint-disable dot-notation */
import { isTest } from '@core/global/env.global'
import { AuthService } from '@core/modules/auth/auth.service'

import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    if (isTest) {
      return true
    }

    const req = this.getRequest(context)
    const session = await this.authService.getSessionUser(req.raw)

    req.raw['session'] = session
    req.raw['isAuthenticated'] = !!session

    if (!session) {
      throw new UnauthorizedException()
    }

    return !!session
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context)
  }
}
