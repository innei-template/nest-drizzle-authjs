import { inspect } from 'node:util'

import { DATABASE } from '@core/app.config'
import { createDrizzle } from '@packages/drizzle'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class DatabaseService {
  public drizzle: ReturnType<typeof createDrizzle>

  constructor() {
    const drizzleLogger = new Logger('')
    this.drizzle = createDrizzle(DATABASE.url, {
      logger: {
        logQuery(query, params) {
          drizzleLogger.debug(query + inspect(params))
        },
      },
    })
  }
}
