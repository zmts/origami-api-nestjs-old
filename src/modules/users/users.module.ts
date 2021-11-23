import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { UsersService } from './services/users.service'
import { UsersRepo } from '@datalayer/pg/users/users.repo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '@datalayer/pg/users/user.entity'

@Module({
  controllers: [ UsersController ],
  imports: [
    TypeOrmModule.forFeature(
      [
        UserEntity,
        UsersRepo
      ]
    )
  ],
  providers: [
    UsersService
  ],
})

export class UsersModule {}