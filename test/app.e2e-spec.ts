import { AppController } from '@core/app.controller'
import { fastifyApp } from '@core/common/adapter/fastify.adapter'
import { Test, type TestingModule } from '@nestjs/testing'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    app = moduleFixture.createNestApplication(fastifyApp)
    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('/ (GET)', () => {
    return app.inject('/').then((res) => {
      expect(res.statusCode).toBe(200)
    })
  })
})
