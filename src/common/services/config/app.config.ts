import * as config from 'config'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { ConfigValidationSchema } from './config-validation-schema'
import {
  SQLConfig
} from './config.types'

const isDevMode = ['dev', 'local', ''].includes(process.env.NODE_ENV)
const validEnvs = ['dev', 'prod', 'stage', 'local', 'test']

export class AppConfig {
  private static _config = { ...config }

  static validate () {
    const config = plainToClass(ConfigValidationSchema, AppConfig._config)
    return validate(config)
  }

  static get appName() {
    return this._config.appName || 'appName'
  }

  static get isDevMode(): boolean {
    return isDevMode
  }

  static get validEnvs(): Array<string> {
    return validEnvs
  }

  static get appPort (): number {
    return this._config.appPort
  }

  static get dbConfig (): SQLConfig {
    return this._config.dbConfig
  }

  static get accessTokenSecret (): string {
    return this._config.accessTokenSecret
  }
}

