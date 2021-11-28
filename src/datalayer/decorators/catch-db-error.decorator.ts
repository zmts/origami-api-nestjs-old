import { AppError } from '@lib/app-error/app-error'
import { DB } from '@lib/app-error/error-codes'

export function CatchDBError (target, key, descriptor) {
  const fn = descriptor.value
  descriptor.value = async function (...args) {
    try {
      return await fn.apply(this, args)
    } catch (e) {
      if (e instanceof AppError) {
        throw e
      }

      throw new AppError({
        ...DB,
        message: `${DB.message}; ${e.message}`,
        origin: e,
      })
    }
  }
}