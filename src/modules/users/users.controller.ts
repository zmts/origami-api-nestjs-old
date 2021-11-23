import { Controller, Get } from '@nestjs/common'

import { UsersService } from '@root/modules/users/services/users.service'

@Controller()
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  getUser() {
    return this.usersService.getUser()
  }
}


