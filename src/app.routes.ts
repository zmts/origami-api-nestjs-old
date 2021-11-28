import { Routes } from '@nestjs/core'

import { AppModule } from '@root/app.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'

export const routes: Routes = [
  {
    path: '/api',
    module: AppModule,
    children: [
      {
        path: '/auth',
        module: AuthModule
      },
      {
        path: '/users',
        module: UsersModule
      }
    ]
  }
]