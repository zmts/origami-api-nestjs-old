import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { routes } from '@root/app.routes'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UsersModule } from '@root/modules/users/users.module'
import { AppConfig } from '@common/services/config/app.config'

const entities = [
  `${__dirname}/datalayer/pg/users/*.entity{.ts,.js}`
]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: AppConfig.dbConfig.host,
      port: AppConfig.dbConfig.port,
      username: AppConfig.dbConfig.user,
      password: AppConfig.dbConfig.password,
      database: AppConfig.dbConfig.database,
      entities,
      synchronize: true,
      logging: AppConfig.isDevMode,
    }),
    RouterModule.register(routes),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
