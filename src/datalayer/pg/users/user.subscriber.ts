import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'

import { PasswordService } from '@common/services/password.service'
import { UserEntity } from './user.entity'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  listenTo (): typeof UserEntity {
    return UserEntity
  }

  async beforeInsert (event: InsertEvent<UserEntity>): Promise<void> {
    if (event.entity.password) {
      event.entity.password = await PasswordService.hashPassword(event.entity.password)
    }
  }
}