import { EntityRepository, Repository } from 'typeorm'

import { CatchDBError } from '@datalayer/decorators/catch-db-error.decorator'
import { UserEntity } from './user.entity'
import { IUser } from './user.interface'

@EntityRepository(UserEntity)
export class UsersRepo extends Repository<UserEntity> {
  @CatchDBError
  async getUserById (id: IUser['id']): Promise<UserEntity | null> {
    const data = await this.findOne({ id })
    if (data) return data || null
  }

  @CatchDBError
  async getUserByEmail (email: IUser['email']): Promise<UserEntity | null> {
    const data = await this.findOne({ email })
    if (data) return data || null
  }

  @CatchDBError
  async createUser (user: IUser): Promise<UserEntity> {
    const { raw } = await this.insert(user)
    const newUser = raw[0]
    delete newUser.password
    return newUser
  }

  @CatchDBError
  async updateUser (user: IUser): Promise<UserEntity> { // ???
    await this.update(user.id, user)
    return user
  }
}
