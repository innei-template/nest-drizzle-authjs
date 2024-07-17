import chalk from 'chalk'
import { Logger } from 'nestjs-pretty-logger'

import { NestFactory } from '@nestjs/core'
import { patchNestjsSwagger } from '@wahyubucil/nestjs-zod-openapi' // <-- add this. Import the patch for NestJS Swagger

import { CROSS_DOMAIN, PORT } from './app.config'
import { AppModule } from './app.module'
import { fastifyApp } from './common/adapter/fastify.adapter'
import { SpiderGuard } from './common/guards/spider.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { consola, logger } from './global/consola.global'
import { isDev } from './shared/utils/environment.util'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

// const APIVersion = 1
const Origin = CROSS_DOMAIN.allowedOrigins

declare const module: any

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    { logger: ['error', 'debug'] },
  )

  const hosts = Origin.map((host) => new RegExp(host, 'i'))

  app.enableCors({
    origin: (origin, callback) => {
      const allow = hosts.some((host) => host.test(origin))

      callback(null, allow)
    },
    credentials: true,
  })

  if (isDev) {
    app.useGlobalInterceptors(new LoggingInterceptor())
  }
  app.useGlobalGuards(new SpiderGuard())

  const config = new DocumentBuilder()
    .setTitle('App API document')
    .setVersion('1.0')
    .build()
  patchNestjsSwagger({ schemasSort: 'alpha' })
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(+PORT, '0.0.0.0', async () => {
    app.useLogger(app.get(Logger))
    consola.info('ENV:', process.env.NODE_ENV)
    const url = await app.getUrl()
    const pid = process.pid

    const prefix = 'P'
    consola.success(`[${prefix + pid}] Server listen on: ${url}`)

    logger.info(`Server is up. ${chalk.yellow(`+${performance.now() | 0}ms`)}`)
  })
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
