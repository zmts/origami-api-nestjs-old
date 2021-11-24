import { NestFactory } from '@nestjs/core'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { AppConfig } from '@common/services/config/app.config'
import { AllExceptionsFilter } from '@common/filters/common-error.filter'
import { AppError } from '@lib/app-error/app-error'
import { VALIDATION } from '@lib/app-error/error-codes'

function configLog() {
  Logger.log('----------')
  Logger.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  Logger.log(`appPort: ${AppConfig.appPort}`)
  Logger.log('----------')
}

const appConfig = (app: INestApplication) => {
  app.enableCors()
  app.useGlobalFilters(new AllExceptionsFilter(new Logger()))
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        throw new AppError({ ...VALIDATION, errors })
      },
      stopAtFirstError: true,
      validationError: {
        value: true,
        target: false,
      },
    }),
  )
}

async function bootstrap() {
  try {
    const validationErrors = await AppConfig.validate()
    if (validationErrors && validationErrors.length) {
      console.log(validationErrors)
      Logger.error(validationErrors)
      process.exit(1)
    }
  } catch (err) {
    Logger.error(err)
    process.exit(1)
  }

  if (!AppConfig.validEnvs.includes(process.env.NODE_ENV)) {
    throw new Error(`Invalid NODE_ENV: ${process.env.NODE_ENV}`)
  }

  configLog()

  const app = await NestFactory.create(AppModule)
  appConfig(app)
  await app.listen(AppConfig.appPort)
}

bootstrap()