import { inspect } from 'node:util'

import { DATABASE } from '@core/app.config'
import { createDrizzle, migrateDb } from '@meta-muse/drizzle'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DatabaseService implements OnModuleInit {
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

  async onModuleInit() {
    await migrateDb(DATABASE.url)
  }
}
