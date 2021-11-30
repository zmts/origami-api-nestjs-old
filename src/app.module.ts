import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { routes } from '@root/app.routes'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UsersModule } from '@root/modules/users/users.module'
import { AuthModule } from '@root/modules/auth/auth.module'
import { PostsModule } from '@root/modules/posts/posts.module'

import { AppConfig } from '@common/services/config/app.config'
import { AuthMiddleware } from '@root/middlewares/auth.middleware'
import { UserSubscriber } from '@datalayer/pg/users/user.subscriber'


const entities = [
  `${__dirname}/datalayer/pg/users/*.entity{.ts,.js}`,
  `${__dirname}/datalayer/pg/posts/*.entity{.ts,.js}`,
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
      subscribers: [UserSubscriber],
      entities,
      synchronize: true,
      logging: AppConfig.isDevMode,
    }),
    RouterModule.register(routes),
    UsersModule,
    AuthModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}
