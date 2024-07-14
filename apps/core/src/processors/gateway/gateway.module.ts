import { Global, Module } from '@nestjs/common'

import { SharedGateway } from './shared/events.gateway'
import { WebEventsGateway } from './web/events.gateway'

@Global()
@Module({
  imports: [],
  providers: [WebEventsGateway, SharedGateway],
  exports: [WebEventsGateway, SharedGateway],
})
export class GatewayModule {}
