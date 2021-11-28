import { UserRoles } from './user.types'

export interface IUser {
  id?: number
  role?: UserRoles
  email?: string
  password?: string
  firstName?: string
  secondName?: string
  createdAt?: Date
  updatedAt?: Date
}