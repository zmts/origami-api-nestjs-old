import * as stdout from 'stdout-stream'
import * as chalk from 'chalk'
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Logger } from '@nestjs/common'

const isDevMode = ['dev', 'local', ''].includes(process.env.NODE_ENV)

const notImportantStatuses = [400, 401, 403, 422]

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private _logger: Logger
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    exception.req = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
      currentUser: request.currentUser,
      ip: request.ip,
      method: request.method,
      url: request.url,
    }

    let originMessage = exception.message
    if (Array.isArray(originMessage)) {
      originMessage = JSON.stringify(originMessage)
    }

    if (exception.stack && isDevMode) {
      stdout.write(
        chalk.red('--------------- ERROR STACK BEGIN --------------\n'),
      )
      stdout.write(`${new Date()}\n`)
      stdout.write(chalk.blue(exception.stack))
      stdout.write(
        chalk.red('\n---------------- ERROR STACK END ---------------\n\n'),
      )
    }

    const status = exception.status
    if (!notImportantStatuses.includes(status)) {
      // log all except minor error
      this._logger.error(originMessage, exception)
    }

    response
      .status(status || 500)
      .json({
        success: false,
        message: originMessage,
        status,
        statusCode: exception.statusCode || undefined
      })
  }
}
