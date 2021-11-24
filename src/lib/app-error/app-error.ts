import { SERVER } from './error-codes'

const parseErrorStatus = (status: string) => {
  const intCode = parseInt(status, 10)
  return intCode >= 100 && intCode < 600 ? intCode : 500
}


export class AppError extends Error {
  public message: string
  public errors: any
  public status: number
  public statusCode: string
  public description: string

  constructor(src: any) {
    super()

    if (src instanceof AppError) return src

    this.status = parseErrorStatus(src.status) || SERVER.status
    this.statusCode = src.statusCode || SERVER.statusCode
    this.message = src.message || SERVER.message
    this.description = src.description || undefined
    this.errors = src.errors || undefined
  }
}