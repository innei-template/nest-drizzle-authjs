import { Global, Module } from '@nestjs/common'

import { AuthModule } from '../../modules/auth/auth.module'
import { SharedGateway } from './shared/events.gateway'
import { WebEventsGateway } from './web/events.gateway'

@Global()
@Module({
  imports: [AuthModule],
  providers: [WebEventsGateway, SharedGateway],
  exports: [WebEventsGateway, SharedGateway],
})
export class GatewayModule {}
