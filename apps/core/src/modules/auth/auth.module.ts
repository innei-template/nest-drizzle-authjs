import {
  Global,
  Inject,
  Module,
  type DynamicModule,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common'

import { AuthConfigInjectKey } from './auth.constant'
import type { ServerAuthConfig } from './auth.implement'
import { AuthMiddleware } from './auth.middleware'
import { AuthService } from './auth.service'

@Module({})
@Global()
export class AuthModule implements NestModule {
  constructor(
    @Inject(AuthConfigInjectKey) private readonly config: ServerAuthConfig,
  ) {}
  static forRoot(config: ServerAuthConfig): DynamicModule {
    return {
      module: AuthModule,
      global: true,
      exports: [AuthService],
      providers: [
        {
          provide: AuthService,
          useFactory() {
            return new AuthService(config)
          },
        },
        {
          provide: AuthConfigInjectKey,
          useValue: config,
        },
      ],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    const config = this.config

    consumer
      .apply(AuthMiddleware)
      .forRoutes(`${config.basePath || '/auth'}/(.*)`)
  }
}
