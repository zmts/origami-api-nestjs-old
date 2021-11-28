import { ICurrentUser } from './current-user.interface'
import { UserRoles } from '@datalayer/pg/users/user.types'

export class CurrentUser implements ICurrentUser {
  userId: number
  role: UserRoles
  email: string

  constructor (src?) {
    this.userId = src?.id || null
    this.role = src?.role || UserRoles.anonymous
    this.email = src?.email || null
  }
}