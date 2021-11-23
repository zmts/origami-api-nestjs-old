import { EntityRepository, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { AppError } from '@lib/app-error/app-error'
import { NOT_FOUND } from '@lib/app-error/error-codes'

@Injectable()
@EntityRepository(UserEntity)
export class UsersRepo extends Repository<UserEntity> {
  async getUserById(userId: number) {
    const data = await this.findOne({ id: userId })
    if (data) return data
    throw new AppError({ ...NOT_FOUND })
  }
}
