import { Injectable } from '@nestjs/common'
import { getCustomRepository } from 'typeorm'
import { UsersRepo } from '@datalayer/pg/users/users.repo'


@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepo = getCustomRepository(UsersRepo)
  ) {}

  getUser () {
    return this.usersRepo.getUserById(1)
  }
}