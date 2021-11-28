import {
  IsEmail,
  IsString,
  IsOptional
} from 'class-validator'
import { IUser } from '@datalayer/pg/users/user.interface'

export class UserUpdateDto implements IUser {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string

  @IsOptional()
  @IsString()
  firstName: string

  @IsOptional()
  @IsString()
  secondName: string
}