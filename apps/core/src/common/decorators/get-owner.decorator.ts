import { getNestExecutionContextRequest } from '@core/transformers/get-req.transformer'
import { type ExecutionContext, createParamDecorator } from '@nestjs/common'

export const Owner = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return getNestExecutionContextRequest(ctx).owner
  },
)
