import { LoggerModule } from 'nestjs-pretty-logger'

import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
  Type,
} from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'

import { AppController } from './app.controller'
import { AllExceptionsFilter } from './common/filters/all-exception.filter'

import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor'
import { IdempotenceInterceptor } from './common/interceptors/idempotence.interceptor'
import { JSONTransformerInterceptor } from './common/interceptors/json-transformer.interceptor'
import { ResponseInterceptor } from './common/interceptors/response.interceptor'
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe'
import { AuthModule } from './modules/auth/auth.module'
import { CacheModule } from './processors/cache/cache.module'
import { DatabaseModule } from './processors/database/database.module'
import { GatewayModule } from './processors/gateway/gateway.module'
import { HelperModule } from './processors/helper/helper.module'
import { RequestContextMiddleware } from './common/middlewares/request-context.middleware'
import { UserModule } from './modules/user/user.module'
import { authConfig } from './modules/auth/auth.config'

// Request ----->
// Response <-----
const appInterceptors: Type<any>[] = [
  IdempotenceInterceptor,
  HttpCacheInterceptor,
  JSONTransformerInterceptor,

  ResponseInterceptor,
]
@Module({
  imports: [
    // processors
    CacheModule,
    DatabaseModule,
    HelperModule,
    LoggerModule,
    GatewayModule,

    // BIZ
    AuthModule.forRoot(authConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    ...appInterceptors.map((interceptor) => ({
      provide: APP_INTERCEPTOR,
      useClass: interceptor,
    })),

    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },

    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('(.*)')
  }
}
