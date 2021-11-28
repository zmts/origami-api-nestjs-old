import { UserRoles } from '@datalayer/pg/users/user.types'

export interface ICurrentUser {
  userId: number | null
  role: UserRoles | null
  email: string | null
}