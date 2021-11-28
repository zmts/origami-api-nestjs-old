import * as jwt from 'jsonwebtoken'
import { AppError } from '@lib/app-error/app-error'
import { SERVER, TOKEN_VERIFY, TOKEN_EXPIRED } from '@lib/app-error/error-codes'

export class JwtService {
  static jwtSign (payload: jwt.JwtPayload, SECRET: string, options: jwt.SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET, options, (error, token) => {
        if (error) return reject(new AppError({ ...SERVER, message: error.message }))
        return resolve(token)
      })
    })
  }

  static jwtVerify (token: string, SECRET: string): Promise<jwt.JwtPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET, (error, decoded) => {
        if (error) {
          if (error.name === 'TokenExpiredError') {
            return reject(new AppError({ ...TOKEN_EXPIRED }))
          }
          return reject(new AppError({ ...TOKEN_VERIFY, message: error.message }))
        }
        return resolve(decoded)
      })
    })
  }
}