import { DatabaseService } from '@core/processors/database/database.service'
import { Global, Module } from '@nestjs/common'

// import { MockedDatabaseService } from './database.service'

// const mockDatabaseService = {
//   provide: DatabaseService,
//   useClass: DatabaseService,
// }
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
@Global()
export class MockedDatabaseModule {}
