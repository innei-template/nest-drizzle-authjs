/* eslint-disable dot-notation */
import { isTest } from '@core/global/env.global'
import { getSessionUser } from '@core/modules/auth/auth.util'
import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    if (isTest) {
      return true
    }

    const req = this.getRequest(context)
    const session = await getSessionUser(req)

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
