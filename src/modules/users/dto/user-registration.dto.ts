import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator'

import { IUser } from '@datalayer/pg/users/user.interface'


export class UserRegistrationDto implements IUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}