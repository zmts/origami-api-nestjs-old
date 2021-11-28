import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import { UserRoles } from './user.types'
import { IUser } from './user.interface'
import { PostEntity } from '../posts/post.entity'

@Entity({ name: 'users' })
export class UserEntity implements IUser {
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

  @OneToMany(() => PostEntity, post => post.user)
  posts?: PostEntity[]

  toJSON? () {
    return {
      ...this,
      password: undefined
    }
  }
}
