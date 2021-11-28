import { Module } from '@nestjs/common'

import { AuthController } from './auth.controller'
import { AuthService } from './services/auth.service'
import { UsersModule } from '@root/modules/users/users.module'

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
