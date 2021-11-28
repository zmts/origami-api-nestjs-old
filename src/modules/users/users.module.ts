import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './services/users.service'
import { UsersRepo } from '@datalayer/pg/users/users.repo'


@Module({
  controllers: [ UsersController ],
  imports: [
    TypeOrmModule.forFeature([UsersRepo])
  ],
  providers: [
    UsersService
  ],
  exports: [
    UsersService
  ]
})

export class UsersModule {}