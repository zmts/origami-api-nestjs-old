import { Routes } from '@nestjs/core'

import { AppModule } from '@root/app.module'
import { UsersModule } from './modules/users/users.module'

export const routes: Routes = [
  {
    path: '/api',
    module: AppModule,
    children: [
      {
        path: '/users',
        module: UsersModule,
      }
    ]
  }
]