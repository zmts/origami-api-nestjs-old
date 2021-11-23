import { Expose, Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString, ValidateNested
} from 'class-validator'

class DbPool {
  @IsNumber()
  @Expose()
    min: number

  @IsNumber()
  @Expose()
    max: number

  @IsNumber()
  @Expose()
    idleTimeoutMillis: number
}

class DbConfig {
  @IsNotEmpty()
  @Expose()
    user: string

  @Expose()
    password: string

  @IsNotEmpty()
  @Expose()
    host: string

  @IsNotEmpty()
  @IsNumber()
  @Expose()
    port: number

  @Type(() => DbPool)
  @IsOptional()
  @Expose()
    pool: DbPool
}

export class ConfigValidationSchema {
  @IsString()
  @IsNotEmpty()
  @Expose()
    appName: string

  @IsNumber()
  @IsNotEmpty()
  @Expose()
    appPort: number

  @Type(() => DbConfig)
  @Expose()
  @IsNotEmptyObject()
  @ValidateNested()
    dbConfig: DbConfig
}