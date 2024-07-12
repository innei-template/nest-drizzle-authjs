import { BusinessEvents } from '@core/constants/business-event.constant'
import { Injectable } from '@nestjs/common'

import { WebEventsGateway } from '../web/events.gateway'

@Injectable()
export class SharedGateway {
  constructor(private readonly web: WebEventsGateway) {}

  broadcast(event: BusinessEvents, data: any) {
    this.web.broadcast(event, data)
  }
}
