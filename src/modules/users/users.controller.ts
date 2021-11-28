import {
  Controller,
  Body,
  Get,
  Post,
  Patch,
  UseGuards
} from '@nestjs/common'

import { ReqUser } from '@common/decorators/req-user.decorator'
import { ReqUserDto } from '@common/dto/req-user.dto'
import { AuthGuard } from '@common/guards/auth.guard'

import { UsersService } from './services/users.service'
import { UserRegistrationDto } from './dto/user-registration.dto'
import { UserUpdateDto } from './dto/user-update.dto'


@Controller()
export class UsersController {
  constructor (
    private usersService: UsersService
  ) {}

  @UseGuards(AuthGuard)
  @Get('current')
  getCurrentUser (@ReqUser() reqUser: ReqUserDto) {
    return this.usersService.getUser(reqUser.userId)
  }

  @UseGuards(AuthGuard)
  @Patch()
  updateCurrentUser (
    @Body() userData: UserUpdateDto,
    @ReqUser() reqUser: ReqUserDto
  ) {
    return this.usersService.updateUser({ ...userData, id: reqUser.userId })
  }

  @Post()
  newUser (@Body() userData: UserRegistrationDto) {
    return this.usersService.createUser(userData)
  }
}


