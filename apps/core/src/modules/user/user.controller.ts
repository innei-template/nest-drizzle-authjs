import { RequestContext } from '@core/common/contexts/request.context'
import { ApiController } from '@core/common/decorators/api-controller.decorator'
import { Auth } from '@core/common/decorators/auth.decorator'
import { Get } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { UserSessionDto } from './user.dto'

@ApiController('users')
@Auth()
export class UserController {
  @Get('/me')
  @ApiOkResponse({
    type: UserSessionDto,
  })
  async me() {
    return RequestContext.currentSession().user
  }
}
