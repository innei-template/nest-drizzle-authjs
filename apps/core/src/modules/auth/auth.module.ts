import {
  Global,
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthMiddleware } from './auth.middleware'

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService],
  exports: [],
})
@Global()
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/auth/(.*)')
  }
}
