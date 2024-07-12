import { DATABASE } from '@core/app.config'
import { createDrizzle, migrateDb } from '@meta-muse/drizzle'
import { Injectable, OnModuleInit } from '@nestjs/common'
// const drizzleLogger = new Logger('')

export const db = createDrizzle(DATABASE.url, {
  // logger: {
  //   logQuery(query, params) {
  //     drizzleLogger.debug(query + inspect(params))
  //   },
  // },
})

@Injectable()
export class DatabaseService implements OnModuleInit {
  public drizzle: ReturnType<typeof createDrizzle>

  constructor() {
    this.drizzle = db
  }

  async onModuleInit() {
    await migrateDb(DATABASE.url)
  }
}
