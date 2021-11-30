import {
  IsBoolean,
  IsOptional,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class PostsFilterDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => ['1', 'true', true].includes(value))
  isFeatured: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => ['1', 'true', true].includes(value))
  isDraft: boolean
}