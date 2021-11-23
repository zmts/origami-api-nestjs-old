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
    id: number

  @Column({
    type: 'enum', enum: UserRoles,
    default: UserRoles.user
  })
    role: string

  @Column()
    email: string

  @Column({ default: null, nullable: true })
    passwordHash: string

  @Column({ default: null, nullable: true })
    firstName?: string

  @Column({ default: null, nullable: true })
    secondName?: string

  @CreateDateColumn()
    createdAt?: Date

  @UpdateDateColumn()
    updatedAt?: Date
}
