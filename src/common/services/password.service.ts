import * as bcrypt from 'bcrypt'

export class PasswordService {
  static hashPassword (password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  static checkPassword ({ password, hash }: { password: string, hash: string }): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}