import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { UserEntity } from '../users/user.entity'

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ default: null, nullable: true })
  title?: string

  @Column({ default: null, nullable: true })
  content?: string

  @Column({ default: false })
  isFeatured?: boolean

  @Column({ default: false })
  isDraft?: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date

  @ManyToOne(type => UserEntity)
  user?: UserEntity

  @JoinColumn({ name: 'userId' })
  @Column({ nullable: true })
  userId?: number
}
