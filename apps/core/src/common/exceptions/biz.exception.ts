import {
  ErrorCode,
  type ErrorCodeEnum,
} from '@core/constants/error-code.constant'
import { HttpException } from '@nestjs/common'

export class BizException extends HttpException {
  constructor(public code: ErrorCodeEnum) {
    const [message, chMessage, status] = ErrorCode[code]
    super(HttpException.createBody({ code, message, chMessage }), status)
  }
}
