import { Injectable } from '@nestjs/common'

import { AppError } from '@lib/app-error/app-error'
import { DB_DUPLICATE_CONFLICT } from '@lib/app-error/error-codes'
import { UsersRepo } from '@datalayer/pg/users/users.repo'
import { IUser } from '@datalayer/pg/users/user.interface'


@Injectable()
export class UsersService {
  constructor (
    private usersRepo: UsersRepo
  ) {}

  async getUser (userId: IUser['id']) {
    return this.usersRepo.getUserById(userId)
  }

  async getUserByEmail (email: IUser['email']) {
    return this.usersRepo.getUserByEmail(email)
  }

  async createUser (user: IUser) {
    const existingUser = await this.usersRepo.getUserByEmail(user.email)
    if (existingUser) {
      throw new AppError({ ...DB_DUPLICATE_CONFLICT })
    }

    return this.usersRepo.createUser(user)
  }

  updateUser (user: IUser) {
    return this.usersRepo.updateUser(user)
  }
}