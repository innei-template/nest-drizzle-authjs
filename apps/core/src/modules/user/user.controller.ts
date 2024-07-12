import { RequestContext } from '@core/common/contexts/request.context'
import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { Auth } from '@core/common/decorators/auth.decorator'
import { Get } from '@nestjs/common'

@ApiController('users')
@Auth()
export class UserController {
  @Get('/me')
  async me() {
    return RequestContext.currentSession().user
  }
}
