import {
  Body,
  Controller,
  Post
} from '@nestjs/common'

import { AuthService } from './services/auth.service'
import { LoginDto } from './dto/login.dto'

@Controller()
export class AuthController {
  constructor (
    private authService: AuthService
  ) {
  }

  @Post('/login')
  login (@Body() loginDto: LoginDto) {
    return this.authService.getAccessToken(loginDto)
  }
}
