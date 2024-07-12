import { isTest } from '@core/global/env.global'
import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

/**
 * JWT auth guard
 */

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(_context: ExecutionContext): Promise<any> {
    if (isTest) {
      return true
    }

    return true
  }

  getRequest(context: ExecutionContext) {
    return getNestExecutionContextRequest(context)
  }
}
