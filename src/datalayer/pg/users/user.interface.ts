import { IBaseEntity } from '@datalayer/common/repo-common.interface'
import { UserRoles } from './user.types'

export interface IUser extends IBaseEntity{
  role?: UserRoles
  email?: string
  password?: string
  firstName?: string
  secondName?: string
}