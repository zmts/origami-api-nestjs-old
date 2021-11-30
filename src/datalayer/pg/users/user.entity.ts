import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { UserRoles } from './user.types'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ default: UserRoles.user })
  role?: UserRoles

  @Column({ unique: true })
  email?: string

  @Column({ default: null, nullable: true })
  password?: string

  @Column({ default: null, nullable: true })
  firstName?: string

  @Column({ default: null, nullable: true })
  secondName?: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  toJSON? () {
    return {
      ...this,
      password: undefined
    }
  }
}
