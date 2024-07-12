import { isTest } from '@core/global/env.global'
import { getSession } from '@core/modules/auth/auth.util'
import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    if (isTest) {
      return true
    }

    const req = this.getRequest(context)
    const session = await getSession(req)

    req.session = session
    req.isAuthenticated = !!session
    return !!session
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context)
  }
}
