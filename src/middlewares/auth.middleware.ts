import { Injectable, NestMiddleware } from '@nestjs/common'

import { CurrentUser } from '@common/current-user'
import { JwtService } from '@common/services/jwt.service'
import { AppConfig } from '@common/services/config/app.config'
const SECRET = AppConfig.accessTokenSecret

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use (req, res, next) {
    const authorization = req.headers['authorization'] || req.headers['Authorization']
    const bearer = authorization && authorization.startsWith('Bearer ') ? authorization : null
    const token = bearer ? bearer.split('Bearer ')[1] : null

    if (token) {
      try {
        const tokenData = await JwtService.jwtVerify(token, SECRET)
        req.currentUser = new CurrentUser({
          ...tokenData,
          id: Number(tokenData.sub)
        })
      } catch (e) {
        next(e)
      }
    } else {
      req.currentUser = new CurrentUser()
    }

    next()
  }
}
