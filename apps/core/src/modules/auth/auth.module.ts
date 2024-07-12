import { Global, Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
@Global()
export class AuthModule {}
