import { Algorithm } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'

import { PasswordService } from '@common/services/password.service'
import { AppConfig } from '@common/services/config/app.config'
import { JwtService } from '@common/services/jwt.service'
import { UsersService } from '@root/modules/users/services/users.service'
import { AppError } from '@lib/app-error/app-error'
import { AUTH, NOT_FOUND } from '@lib/app-error/error-codes'
import { AuthTokenEnum } from '@root/modules/auth/services/auth-token.enum'

@Injectable()
export class AuthService {
  constructor (
    private usersService: UsersService
  ) {}

  async getAccessToken (loginPayload: { email: string, password: string }): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByEmail(loginPayload.email)
    if (!user) throw new AppError({
      ...NOT_FOUND
    })

    const isPasswordValid = await PasswordService
      .checkPassword({
        password: loginPayload.password,
        hash: user.password
      })

    if (isPasswordValid) {
      const payload = {
        tokenType: AuthTokenEnum.TYPE_ACCESS,
        role: user.role,
        email: user.email,
        iss: AppConfig.appName
      }

      const SECRET = AppConfig.accessTokenSecret

      const options = {
        algorithm: 'HS512' as Algorithm,
        subject: String(user.id),
        expiresIn: '1h'
      }

      const token = await JwtService.jwtSign(payload, SECRET, options)
      return { accessToken: token }
    } else {
      throw new AppError({ ...AUTH })
    }
  }
}
