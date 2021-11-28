import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ICurrentUser } from '@common/current-user.interface'

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUser => {
    const request = ctx.switchToHttp().getRequest()
    const { currentUser } = request
    return currentUser
  }
)