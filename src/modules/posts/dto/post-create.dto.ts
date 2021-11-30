import {
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator'

import { IPost } from '@datalayer/pg/posts/post.interface'


export class PostCreateDto implements IPost {
  @IsOptional()
  @IsString()
  content: string

  @IsString()
  @IsNotEmpty()
  title: string
}