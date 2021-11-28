import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, ManyToOne,
} from 'typeorm'

import { UserEntity } from '../users/user.entity'

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, user => user.posts)
  user: UserEntity

  @Column({ default: null, nullable: true })
  title?: string

  @Column({ default: null, nullable: true })
  content?: string

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
